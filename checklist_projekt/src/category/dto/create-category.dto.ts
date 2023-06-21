import {IsNotEmpty, IsOptional} from "class-validator";

export class CreateCategoryDto {
    @IsOptional()
    title?:string;

    @IsOptional()
    description?:string;

}
