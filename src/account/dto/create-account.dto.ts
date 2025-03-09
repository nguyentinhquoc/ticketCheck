import { IsString, MinLength } from "class-validator";

export class CreateAccountDto {
  @IsString()
  user_name: string;

  @IsString()
  @MinLength(6)
  password: string;
}
