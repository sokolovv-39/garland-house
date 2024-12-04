export type UserType = {
  id: number;
  fio: string;
  email: string;
  role: string;
};

export enum UserRoleEnum {
  Admin = "Admin",
  Manager = "Manager",
  Executor = "Executor",
}
