import {Injectable, NotFoundException} from '@nestjs/common';
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
        const { category_id, ...taskData } = createTaskDto;



        const task = this.taskRepository.create({
            ...taskData,
            user: { id: user_id },
            category: { id: category_id },
        });

        return await this.taskRepository.save(task);
    }

    async findAllByUser(userId: number): Promise<Task[]> {
        return this.taskRepository.find({ where: { user: { id: userId } } , relations: ["category"]});

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
        const { category_id, ...rest } = updateTaskDto;

        await this.taskRepository.update(id, rest);

        // Assign the category separately if it exists in the updateTaskDto
        if (category_id) {
            await this.taskRepository.createQueryBuilder()
                .relation(Task, "category")
                .of(id)
                .set(category_id);
        }

        return this.findOne(id);
    }

    remove(id: number): Promise<DeleteResult> {
        return this.taskRepository.delete(id);
    }
}
