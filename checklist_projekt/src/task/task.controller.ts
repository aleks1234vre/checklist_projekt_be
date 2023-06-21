import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Request,
    BadRequestException
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

import {Task} from "../entities/task.entity";
import {JwtAuthGuard} from "../auth/guards/jwtAuth.guard";

@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {
    }
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Request() req, @Body() createTaskDto: CreateTaskDto) {
        return this.taskService.create(req.user.id, createTaskDto);
    }

    @Get()
    findAll() {
        return this.taskService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.taskService.findOne(+id);
    }


    @Patch(':id')
    async update(
        @Request() req,
        @Param('id') id: string,
        @Body() updateTaskDto: UpdateTaskDto
    ) {
        const currentUser = req.user.id;
        const task: Task = await this.taskService.findOne(+id);
        if (currentUser != task.user.id) {
            throw new BadRequestException("It is not your task");
        }
        return this.taskService.update(+id, updateTaskDto);
    }

    @Delete(':id')
    async remove(@Request() req, @Param('id') id: string) {
        const currentUser = req.user.id;
        const task: Task = await this.taskService.findOne(+id);
        if (currentUser != task.user.id) {
            throw new BadRequestException("It is not your task");
        }
        return this.taskService.remove(+id);
    }
}

