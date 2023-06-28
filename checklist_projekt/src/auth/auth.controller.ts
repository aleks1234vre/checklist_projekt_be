import { Controller, Post, UseGuards, Request, Get, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { LocalAuthGuard } from './guards/localAuth.guard';
import { JwtAuthGuard } from './guards/jwtAuth.guard';

import { User } from '../entities/user.entity';
import { UserService } from '../user/user.service'; // Import UserService

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService, // Inject UserService
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async signIn(@Request() req, @Res() res: Response) {
        const jwt = req.user;
        res.setHeader('Set-Cookie', [jwt]).json();
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Request() req): Promise<User> {
        const userId = req.user.id;
        return this.userService.findById(userId);
    }

    @Post('logout')
    logout(@Request() req) {
        req.res.setHeader('Set-Cookie', `Access_token=; HttpOnly; Path=/; Max-Age=0`);
        req.res.status(HttpStatus.OK).json({ message: 'Logout successful' });
    }
}