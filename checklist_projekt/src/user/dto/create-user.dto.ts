import {IsEmail, IsNotEmpty, MinLength} from 'class-validator';
import {Column} from "typeorm";
export class CreateUserDto {
    @IsNotEmpty()
    first_name: string;

    @IsNotEmpty()
    last_name: string;

    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    phone_number: number;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    password: string;


}