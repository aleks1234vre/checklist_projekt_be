import {Column} from "typeorm";
import {IsNotEmpty, IsOptional} from "class-validator";


export class CreateTaskDto {
    @IsNotEmpty()
    title_task: string;

    @IsOptional()
    description_task?: string;

    @IsOptional()
    status?: boolean;

    @IsOptional()
    finished_at?: Date;

    @IsOptional()
    taskNumber?:number;

    @IsOptional()
    category_id?: number;

    @IsOptional()
    user_id?: number;

}