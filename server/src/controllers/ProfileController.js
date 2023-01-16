const UserModel = require('../Models/UserModel');
const UserProfile = require('../Models/UserProfile');
const UserLink = require('../Models/UserLink');
const supabase = require('../supabaseConfig');

class ProfileController {
  async getProfile(req, res) {
    const { id: userId } = req.user;

    try {
      const userProfile = await UserProfile.findOne({user_id: userId});

      return res.status(200).json(userProfile)
    } catch (error) {
      return res.status(500).json({ message:  error.message});
    }
  }

  async getProfileByUsername(req, res) {
      const { username } = req.params;
      
      try {
        const user = await UserModel.findOne({ username: username })

        if(!user) {
          return res.status(404).json({message: 'Usuário não encontrado.'})
        }
        
        const profile = await UserProfile.findOne({user_id: user._id})

        const links = await UserLink.find({user_id: profile.user_id})

        return res.status(200).json({
          name: user.name,
          profile,
          links
        })
      } catch (error) {
        console.log(error)
        return res.status(500).json({ message:  error.message});
      }
  }

  async uploadAvatar(req, res) {
    const {id: userId, username} = req.user;
    const updateTime = Date.now();
    const name = `${userId}_${updateTime}`
    try {

      const { data, error } = await supabase
      .storage
      .from(process.env.SUPABASE_BUCKET)
      .upload(`${username}/${name}`, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: false
      })

      if (error) {
        return res.status(400).json(error.message)
      }

      const { data: listFiles , error: errorListFiles } = await supabase
      .storage
      .from(process.env.SUPABASE_BUCKET)
      .list(`${username}`, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' },
      })

      const filesToBeDeleted = listFiles.slice(0, listFiles.length - 1);
      const filesName = []
      filesToBeDeleted.map((file) => filesName.push(file.name))
      
      const { data: dataRemove, error: errorDataRemove } = await supabase
      .storage
      .from(process.env.SUPABASE_BUCKET)
      .remove([`${username}/${filesName[0]}`])
      
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

  async updateProfile(req, res) {
    const {id: userId} = req.user;
    const {description, background_color, background_button_color, text_color, button_text_color, profile_title } = req.body;

    try {
      
      const userUpdated = await UserProfile.updateMany({ user_id: userId }, {
        profile_title,
        description,
        background_color,
        background_button_color,
        text_color,
        button_text_color
      })

      if(userUpdated.acknowledged === false){
        return res.status(400).json({message: 'Não foi possível atualizar o perfil do usuário.'})
      }
      
      const updatedProfile = await UserProfile.find({user_id: userId})

      
      return res.status(200).json(updatedProfile)
    } catch (error) {
      return res.status(500).json({ message:  error.message});
    }
  }
}

module.exports = new ProfileController();