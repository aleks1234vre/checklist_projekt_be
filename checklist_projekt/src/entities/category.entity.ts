import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Task} from "./task.entity";

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    category_name: string;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => Task, task => task.category, { onDelete: 'CASCADE'})
    tasks: Task[];

}
