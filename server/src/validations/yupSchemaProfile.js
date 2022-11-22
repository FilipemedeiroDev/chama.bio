const yup = require('./config');

const profileValidation = yup.object().shape({
    description: yup.string().nullable().required('The description field is required'),
    background_color: yup.string().nullable().required('The background color field is required'),
    background_button_color: yup.string().nullable().required('The backgground button field is required'),
    text_color: yup.string().nullable().required('The text color field is required')
});

module.exports = profileValidation;