const UserProfile = require('../Models/UserProfile');
const supabase = require('../supabaseConfig');

class ProfileController {
  async getProfile(req, res) {
    const { id: userId } = req.user;

    try {
      const userProfile = await UserProfile.find({user_id: userId});

      return res.status(200).json(userProfile)
    } catch (error) {
      return res.status(500).json({ message:  error.message});
    }
  }

  async uploadAvatar(req, res) {
    const {id: userId, username} = req.user;
    const name = `${userId}_${username}`
    try {
      
      const { data, error } = await supabase
      .storage
      .from(process.env.SUPABASE_BUCKET)
      .upload(`${username}/${name}`, req.file.buffer, {
        contentType: req.file.mimetype,
        cacheControl: 3600,
        upsert: true
      })
      
      
      if (error) {
        return res.status(400).json(error.message)
      }

      const { data: PublicUrl, error: errorPublicUrl } = supabase
      .storage
      .from(process.env.SUPABASE_BUCKET)
      .getPublicUrl(`${username}/${name}`)

    if (errorPublicUrl) {
      return res.status(400).json(error.message)
    }

    await UserProfile.updateOne({user_id: userId}, {
      avatarUrl: PublicUrl.publicUrl
    })

    return res.status(200).json({avatarUrl: PublicUrl.publicUrl})
    } catch (error) {
      return res.status(500).json({ message:  error.message});
    }
  }

  async removeAvatar(req, res) {
    const {id: userId, username} = req.user;
    const name = `${userId}_${username}`
    
    try {
    const { data, error } = await supabase
    .storage
    .from(process.env.SUPABASE_BUCKET)
    .remove(`${username}/${name}`)
      
    if (error) {
      return res.status(400).json(error.message)
    }

    await UserProfile.updateOne({user_id: userId}, {
      avatarUrl: null
    })

    return res.status(200).json({message: 'Avatar excluido com sucesso.'})
    } catch (error) {
      return res.status(500).json({ message:  error.message});
    }
  }

  async updateProfile(req, res) {
    const {id: userId} = req.user;
    const {description, background_color, background_button_color, text_color } = req.body;

    try {
      await profileValidation.validate(req.body);

      const userUpdated = await UserProfile.updateMany({ user_id: userId }, {
        description,
        background_color,
        background_button_color,
        text_color
      })

      if(userUpdated.acknowledged === false){
        return res.status(400).json({message: 'Não foi possível atualizar o perfil do usuário.'})
      }
      
      return res.status(200).json({ message: 'Perfil atualizado com sucesso!'})
    } catch (error) {
      return res.status(500).json({ message:  error.message});
    }
  }
}

module.exports = new ProfileController();