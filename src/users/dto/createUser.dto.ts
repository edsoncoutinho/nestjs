import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { IsEmailUnique } from "../validator/email-is-unique.validator";

export class CreateUserDTO {
    @IsNotEmpty({ message: 'O nome não pode ser vazio' })
    name: string;

    @IsEmail(undefined, { message: 'O email informado é inválido' })
    @IsEmailUnique({ message: 'Já existe um usuário com esse email' })
    email: string;

    @MinLength(6, { message: 'A senha precisa ter pelo menos 6 caractere' })
    password: string;
}