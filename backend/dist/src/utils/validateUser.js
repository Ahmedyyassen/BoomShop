import Joi from "joi";
export const registerValidation = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().min(3).max(100).required(),
        lastName: Joi.string().min(3).max(100).required(),
        email: Joi.string().required().email().pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/),
        password: Joi.string().required().min(6),
        confirmPassword: Joi.string().required().valid(Joi.ref('password')),
    });
    return schema.validate(data);
};
export const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().required().email().pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/),
        password: Joi.string().required().min(6),
    });
    return schema.validate(data);
};
export const profileValidation = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().min(3).max(100).optional(),
        lastName: Joi.string().min(3).max(100).optional(),
        password: Joi.string().min(6).optional(),
        profilePicture: Joi.string().optional(),
    });
    return schema.validate(data);
};
export const changePasswordValidation = (data) => {
    const schema = Joi.object({
        currentPassword: Joi.string().required().min(6),
        newPassword: Joi.string().required().min(6),
        confirmNewPassword: Joi.string().required().min(6).valid(Joi.ref('newPassword'))
    });
    return schema.validate(data);
};