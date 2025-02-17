export class CreateUserDto {
  name: string;
  birthday: Date;
  phone?: string;
  email: string;
  password: string;
}

export class UpdateUserDto {
  name?: string;
  birthday?: Date;
  phone?: string;
  email?: string;
}
