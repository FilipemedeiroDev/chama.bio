const UserLink = require('../Models/UserLink');
const UserModel = require('../Models/UserModel');

class LinkController {
  async getUserLinks (req, res) {
    const { id: userId } = req.user;

    try {
        const userLinks = await UserLink.find({user_id: userId});

        return res.status(200).json(userLinks)
    } catch (error) {
      return res.status(500).json({ message:  error.message});
    }
  }

  async createLink (req, res) {
    const { id: userId } = req.user;
    const {title, destination} = req.body;

    try {
      const linkRegister = await UserLink.create({
        user_id: userId,
        title,
        destination
      })

      if(!linkRegister){
        return res.status(400).json({message: 'Não foi possivel criar um novo link'})
      }
      
      return res.status(201).json(linkRegister)
    } catch (error) {
      return res.status(500).json({ message:  error.message});
    }
  }

  async deleteLink(req, res) {
      const { id } = req.params;

      try {
        const deletedLink = await UserLink.deleteOne({_id: id})

        if(!deletedLink) {
          return res.status(400).json({message: 'Não foi possivel excluir o Link'})
        }
        
        return res.status(200).json({message: 'Link excluido com sucesso!'})
      } catch (error) {
        return res.status(500).json({ message:  error.message});
      }
  }
}

module.exports = new LinkController();