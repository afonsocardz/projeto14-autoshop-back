import joi from 'joi';

const Login = joi.object({
    email: joi.string()
        .required(),
        
    password: joi.string()
        .required()
});

export default Login;