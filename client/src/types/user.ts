export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  profilePicture:string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UPDATEUSER{
  firstName?: string;
  lastName?: string;
  profilePicture?:string;
}

export interface CHANGEPASSWORD{
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}