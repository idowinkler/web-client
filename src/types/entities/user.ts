export interface UserEntity {
  _id: string;
  firstName: string;
  lastName: string;
  userName: string;
  image: string
}

export interface UserData extends UserEntity {
  email: string;
  password: string;
}

export interface UserRegisterData extends Omit<UserEntity, "_id"> {
  email: string;
  password: string;
}
