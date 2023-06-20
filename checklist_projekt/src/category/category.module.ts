import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import {TypeOrmModule} from "@nestjs/typeorm";

import {Category} from "../entities/category.entity";
import {TaskService} from "../task/task.service";
import {Task} from "../entities/task.entity";

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, TaskService],
  imports: [TypeOrmModule.forFeature([Category, Task])]
})
export class CategoryModule {}
