export type IUser = {
  _id?: string;
  name: string;
  email: string;
  password: string;
  image: string;

  role: "admin" | "user";
};

export type ILoginUser = {
  _id?: string;
  email: string;
  password: string;
  role?: string;
};

export type ILoginResponse = {
  accessToken: string;
  refreshToken?: string;
};
export type IRefreshToken = {
  accessToken: string;
};

export type IChangePassword = {
  oldPassword: string;
  newPassword: string;
};

export type DeleteResponse = {
  acknowledged: boolean;
  deletedCount: number;
};
