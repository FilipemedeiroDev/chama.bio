const yup = require('./config');

const loginValidation = yup.object().shape({
  email: yup.string().email(),
  password: yup
      .string()
      .min(6)
      .trim('Only valid characters are allowed in the password field'),
});

module.exports = loginValidation;