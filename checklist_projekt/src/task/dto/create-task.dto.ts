import {Column} from "typeorm";
import {IsNotEmpty} from "class-validator";


export class CreateTaskDto {
    @IsNotEmpty()
    title_task: string;

    @IsNotEmpty()
    description_task: string;

    @IsNotEmpty()
    status: boolean;

    @IsNotEmpty()
    finished_at: Date;

    @IsNotEmpty()
    category_id: number;

    @IsNotEmpty()
    user_id: number;

}