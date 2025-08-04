import { compare, genSalt, hash } from "bcrypt";


export const hashValue = async(password: string):Promise<string> => {
  const salt = await genSalt(10);
  return await hash(password, salt);
};

export const compareValue = async (password: string, hash: string):Promise<boolean> =>
  await compare(password, hash);