import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Task} from "./task.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name:string;

    @Column()
    last_name:string;

    @Column()
   address: string;

   @Column()
    phone_number: number;

    @Column({unique: true})
    email: string;

    @Column({ nullable: true })
   is_admin: boolean;

    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => Task, task => task.user, { onDelete: 'CASCADE'})
    tasks: Task[];
}


