export interface SignInDTO {
  email: string;
  password: string;
}

export interface SignUpDTO {
  email: string;
  company: string;
  password: string;
  telefono: string;
  name: string;
}

export interface updateUserDTO {
  id: string;
  email?: string;
  company?: string;
  password?: string;
  telefono?: string;
  name?: string;
}
