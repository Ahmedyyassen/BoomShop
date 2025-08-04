import "dotenv/config";

const getEnv = (key: string, defaultValue?: string) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

export const PORT = getEnv("PORT", "3000");
export const MONGO_URI = getEnv("MONGO_URI");
export const JWT_SECRET = getEnv("JWT_SECRET");
export const NODE_ENV = getEnv("NODE_ENV");
export const CLIENT_API = getEnv("CLIENT_API");

export const CLOUDINARY_NAME = getEnv("CLOUDINARY_NAME");
export const CLOUDINARY_API_KEY = getEnv("CLOUDINARY_API_KEY");
export const CLOUDINARY_API_SECRET = getEnv("CLOUDINARY_API_SECRET");