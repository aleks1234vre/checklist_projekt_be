import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {Category} from "../entities/category.entity";
import {DeleteResult} from "typeorm";

@Controller('categories')
export class CategoryController {
    constructor(private readonly categoriesService: CategoryService) {}

    @Post()
    create(@Body() createCategoryDto: CreateCategoryDto):Promise<Category> {
        return this.categoriesService.create(createCategoryDto);
    }

    @Get()
    findAll(): Promise<Category[]> {
        return this.categoriesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Category> {
        return this.categoriesService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateCategoryDto: UpdateCategoryDto)
        :Promise<Category> {
        return this.categoriesService.update(+id, updateCategoryDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<DeleteResult> {
        return this.categoriesService.remove(+id);
    }
}
