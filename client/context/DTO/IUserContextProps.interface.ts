import { IUser } from "@/interfaces/User.interface";
import { SignInDTO, SignUpDTO, updateUserDTO } from "./sing.user.dto";

export interface IUserContextProps {
  token: string;
  user: IUser | null;
  signInO: (data: SignInDTO) => Promise<IUser | null>;
  signUp: (data: SignUpDTO) => Promise<IUser>;
  deleteUser: (data: SignInDTO) => Promise<IUser>;
  mailIsValid: (email: string) => Promise<boolean>;
  updateUser: (updateUserData: updateUserDTO) => Promise<IUser>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<IUser | null>;
  signUpWithGoogle: () => Promise<IUser | null>;
  requestResetPassword: (email: string) => Promise<{ message: string }>;
  resetPassword: (
    token: string,
    newPassword: string
  ) => Promise<{ message: string }>;
}
