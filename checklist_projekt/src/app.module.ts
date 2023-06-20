
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule} from "@nestjs/config";
import { CategoryModule } from './category/category.module';
import { TaskModule } from './task/task.module';
import * as process from "process";
import {User} from "./entities/user.entity";
import { Category } from './entities/category.entity';
import { Task } from './entities/task.entity';
import {AuthModule} from "./auth/auth.module";
import { JwtModule } from "@nestjs/jwt";
import {Module} from "@nestjs/common";



@Module({
 imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        UserModule,
        CategoryModule,
        DatabaseModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DATABASE_HOST || 'localhost',
            port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            autoLoadEntities: true,
            entities: [User, Category, Task ],
            synchronize: true
        }),
     AuthModule,
     TaskModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule{}
