import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {User} from "./user.entity";
import {Category} from "./category.entity";

@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title_task:string;

    @Column()
    description_task:string;

    @Column({nullable: true})
    status:boolean;

    @CreateDateColumn({nullable:true})
    created_at: Date;

    @UpdateDateColumn({nullable:true})
    updated_at: Date;

    @Column({nullable:true})
    finished_at: Date;

    @ManyToOne(() => User, user => user.tasks)
    @JoinColumn({ name: 'user_id' })
    user: User;


    @ManyToOne(() => Category, category => category.tasks)
    @JoinColumn({ name: 'category_id' })
    category: Category
}
