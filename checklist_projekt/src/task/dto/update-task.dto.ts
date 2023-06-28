import {Column} from "typeorm";
import {PartialType} from "@nestjs/mapped-types";
import {CreateTaskDto} from "./create-task.dto";
import {IsOptional} from 'class-validator';

export class UpdateTaskDto extends PartialType (CreateTaskDto) {
    @IsOptional()
    title_task?: string;

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