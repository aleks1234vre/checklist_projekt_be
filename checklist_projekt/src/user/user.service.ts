import {BadRequestException, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from "../entities/user.entity";
import {DeleteResult, Repository} from "typeorm";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async create(createUserDto: CreateUserDto):Promise<User> {
        const user = await this.findByEmail(createUserDto.email);
        if (user) {
            throw new BadRequestException('Email že obstaja');
        }
        //console.log(createUserDto);
        const hashed = await bcrypt.hash(createUserDto.password,10);
        const data = {...createUserDto, password:hashed};
        try {
            const newUser = this.userRepository.create(data);
            return this.userRepository.save(newUser);
        }
        catch (e) {
            console.log(e);
            throw new BadRequestException('Napaka pri shranjevanju');
        }
    }

    async delete(id:number): Promise<DeleteResult> {
        return this.userRepository.delete(id);
    }

    async findById(id: number): Promise<User> {
        return this.userRepository.findOneBy({id});
    }

    async findByEmail(email:string): Promise<User> {
        return this.userRepository.findOneBy({email});
    }


    async update(id:number, updateUserDto:UpdateUserDto): Promise<User> {
        try {
            await this.userRepository.update(id, updateUserDto);
            return this.findById(id);
        }
        catch (e) {
            throw new BadRequestException('Napaka pri posodabljanju');
        }
    }
}
