import {IsNotEmpty, IsOptional} from "class-validator";

export class CreateCategoryDto {
    @IsOptional()
    category_name?:string;

    @IsOptional()
    description?:string;

}
