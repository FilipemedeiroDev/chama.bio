const yup = require('./config');

const userValidation = yup.object().shape({
    name: yup.string().required('The name field is required'),
    email: yup.string().email().required('The e-mail field is required'),
    password: yup
        .string()
        .required('The password field is required')
        .min(6)
        .trim('Only valid characters are allowed in the password field'),
    username: yup.string().required('The password field is required')
});

module.exports = userValidation;