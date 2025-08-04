export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  profilePicture:string;
  createdAt: string;
  updatedAt: string;
}

export interface UPDATEUSER{
  firstName?: string;
  lastName?: string;
  profilePicture?:string;
}