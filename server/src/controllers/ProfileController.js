const UserProfile = require('../Models/UserProfile')

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

  async uploadAvatar() {

  }

  async updateProfile(req, res) {
    const {id: userId} = req.user;
    const {description, background_color, background_button_color, text_color } = req.body;

    try {
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