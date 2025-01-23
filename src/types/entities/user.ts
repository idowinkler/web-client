export interface UserEntity {
  _id: string;
  firstName: string;
  lastName: string;
  userName: string;
}

export interface UserData extends Omit<UserEntity, "_id"> {
  email: string;
  password: string;
}
