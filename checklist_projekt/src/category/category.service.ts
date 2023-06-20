import {BadRequestException, Injectable} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {Category} from "../entities/category.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {DeleteResult, Repository} from "typeorm";
import {Task} from "../entities/task.entity";
import {TaskService} from "../task/task.service";

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository:Repository<Category>,
        private taskService: TaskService
    ) {
    }
    async create(createCategoryDto: CreateCategoryDto):Promise<Category> {
        try {
            const newCategory = this.categoryRepository.create(createCategoryDto);
            return this.categoryRepository.save(newCategory);
        }
        catch (e) {
            console.log(e);
            throw new BadRequestException('Napaka pri shranjevanju kategorije');
        }
    }

    findAll(): Promise<Category[]> {
        return this.categoryRepository.find();
    }

    findOne(id: number): Promise<Category> {
        return this.categoryRepository.findOneBy({id});
    }

    async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
        try {
            await this.categoryRepository.update(id, updateCategoryDto);
            return this.findOne(id);
        }
        catch (e) {
            console.log(e);
            throw new BadRequestException('Napaka pri posodabljanju kategorije');
        }
    }

    async remove(id: number): Promise<DeleteResult> {
        const tasks = await this.taskService.findByCategoryId(id);
        tasks.map((task:Task,i)=>{
            this.taskService.remove(task.id);
        });
        try {
            return this.categoryRepository.delete(id);
        }
        catch (e) {
            console.log(e);
            throw new BadRequestException('Napaka pri brisanju');
        }
    }
}
