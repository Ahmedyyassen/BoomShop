import Joi from "joi";

type LoginData = {
    email: string;
    password: string;
}
type RegisterData = LoginData & {
    firstName: string;
    lastName: string;
    confirmPassword: string;
}

export const registerValidation = (data: RegisterData) => {
    const schema = Joi.object<RegisterData>({
        firstName: Joi.string().min(3).max(100).required(),
        lastName: Joi.string().min(3).max(100).required(),
        email: Joi.string().required().email().pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/),
        password: Joi.string().required().min(6),
        confirmPassword: Joi.string().required().valid(Joi.ref('password')),
    });
    return schema.validate(data);
};
export const loginValidation = (data: LoginData) => {
    const schema = Joi.object<LoginData>({
        email: Joi.string().required().email().pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/),
        password: Joi.string().required().min(6),
    });
    return schema.validate(data);
};
type ProfileDate ={
    firstName: string;
    lastName: string;
    password: string;
    profilePicture: string;
}
export const profileValidation = (data: ProfileDate) => {
    const schema = Joi.object<ProfileDate>({
        firstName: Joi.string().min(3).max(100).optional(),
        lastName: Joi.string().min(3).max(100).optional(),
        password: Joi.string().min(6).optional(),
        profilePicture: Joi.string().optional(),
    });
    return schema.validate(data);
};