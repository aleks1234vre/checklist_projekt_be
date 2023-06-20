import {IsOptional} from 'class-validator';
import {Column} from "typeorm";
export class UpdateUserDto {
    @IsOptional()
    first_name?: string;

    @IsOptional()
    last_name?: string;

    @Column()
    address?: string;

    @Column()
    phone_number?: number;

}