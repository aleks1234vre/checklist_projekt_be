import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Task} from "../entities/task.entity";
import {DeleteResult, Repository} from "typeorm";

@Injectable()
export class TaskService {

    constructor(
        @InjectRepository(Task) private taskRepository: Repository<Task> ) {
    }

    async create(user_id: number, createTaskDto: CreateTaskDto) {
        const data =
            { ...createTaskDto,
                user: {id: user_id},
                category: {id: createTaskDto.category_id}
            };
        const task = this.taskRepository.create(data);
        return await this.taskRepository.save(task);
    }

    async findAllByUser(userId: number): Promise<Task[]> {
        return this.taskRepository.find({ where: { user: { id: userId } } });
    }
    async findAll(): Promise<Task[]> {
        return await this.taskRepository.find();
    }

    async findOne(id: number): Promise<Task> {
        return await this.taskRepository.findOne(
            {
                where: {id},
                relations: ['user']
            }
        );
    }

    async findByCategoryId(id: number): Promise<Task[]> {
        return await this.taskRepository.find(
            {
                where: {category: {id}}
            }
        );
    }

    async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
        await this.taskRepository.update(id, updateTaskDto);
        return this.findOne(id);
    }

    remove(id: number): Promise<DeleteResult> {
        return this.taskRepository.delete(id);
    }
}
