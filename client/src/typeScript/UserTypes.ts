export interface UserInterface {
  success: boolean;
  message: string;
  data: {
    name: string;
    email: string;
    gender: string;
    role: string;
    _id: string;
    ProfileIMG: string;
  };
}

export interface UserData {
  name: string;
  email: string;
  gender: string;
  role: string;
  _id: string;
  ProfileIMG: string;
}
