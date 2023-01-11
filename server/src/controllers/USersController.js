const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { addHours, isBefore } = require('date-fns');


const jwtSecret = require('../jwtSecret');

const userValidation = require('../validations/yupSchemaCreateUser');
const loginValidation = require('../validations/yupSchemaLogin');

const nodemailer = require('../nodemailerConfig')

const UserModel = require('../Models/UserModel');
const UserToken = require('../Models/UserToken');
const UserProfile = require('../Models/UserProfile')

class UsersController {

    async Create(req, res) {
        const { name, email, password, username} = req.body;

        try {
          await userValidation.validate(req.body);

          const emailAlreadyExists = await UserModel.findOne({email})

          if(emailAlreadyExists) {
            return res.status(400).json({ message: 'E-mail já cadastrado.'})
          }

          const userAlreadyExists = await UserModel.findOne({username})
          
          if(userAlreadyExists) {
            return res.status(400).json({ message: 'Username já existe, tente outro!'})
          }
        
          const encryptedPassword = await bcrypt.hash(password, 10);
          
          const userRegister = await UserModel.create({
            name,
            email,
            password: encryptedPassword,
            username,
            avatarUrl: null
          })

          if(!userRegister) {
            return res.status(400).json({ message:  'Não foi possive cadastrar o usuário'})
          }
          
          await UserProfile.create({
            user_id: userRegister._id
          })

           return res.status(201).json({message: 'Usuário cadastrado com sucesso!'})
          } catch (error) {
            return res.status(500).json({ message:  error.message});
          }
    }

    async getUser(req, res) {
      const { id: userId } = req.user;

      try {
        const user = await UserModel.findOne({_id: userId }, '-password')
        
        if(!user) {
          return res.status(404).json({message: 'Usuário não encontrado'})
        }

        return res.status(200).json(user)
      } catch (error) {
        return res.status(500).json({ message:  error.message});
      }
    }


    async Login(req,res) {
      const { email, password } = req.body;

      try {
        await loginValidation.validate(req.body);

        const user = await UserModel.findOne({ email });
        
        if(!user) {
          return res.status(400).json({ message: 'Usuário não encontrado'})
        }

        const validatePassword = await bcrypt.compare(password, user.password)

        if(!validatePassword) {
          return res.status(400).json({ message: 'Email e/ou senha invalidos.' })
        }

        const token = jwt.sign({
          id: user._id,
          username:  user.username
        }, jwtSecret, {
          expiresIn: '4h'
        });

        return res.status(200).json({
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            username:  user.username,
          },
          token
        });
      } catch (error) {
        return res.status(500).json({ message:  error.message});
      }
    }

    async Forgot(req, res) {
      const { email } = req.body;

      const expiresAt = addHours(new Date(), 3);
      
      try {
        const user = await UserModel.findOne({ email });

        if(!user) {
          return res.status(404).json({ message: 'Usuário não encontrado.'})
        }
        
        const generatedToken = await UserToken.create({
          user: user._id,
          expiresAt,
          confimationtype: 'reset_password' 
        })
        
        nodemailer.sendMail({
          from: 'medeirolp@gmail.com',
          to: user.email,
          subject: 'Redefinição de Senha',
          html: `<a href="https://chama.bio/reset/${generatedToken.code}" target="_blank">Clique aqui para redefinir sua senha</a>`
        })
        
        return res.status(201).send();
      } catch (error) {
        return res.status(500).json({ message:  error.message});
      }

    }

    async Reset(req, res) {
        const { code } = req.params;
        const { newPassword } = req.body;
        
        try {
          const userToken = await UserToken.findOne({ code }).populate('user','-password');
      
          if(!userToken) {
            return res.status(404).json({ message: 'Token invalido.'})
          }

          if (isBefore(userToken.expiresAt, new Date())) {
            return res.status(404).json({ message: 'Token expirado.'})
          }

          const encryptedPassword = await bcrypt.hash(newPassword, 10);

          await UserModel.updateOne({ _id: userToken.user._id }, { 
            password: encryptedPassword
          });

          return res.send()
        } catch (error) {
          return res.status(500).json({ message:  error.message});
        }
    }
}

module.exports = new UsersController();