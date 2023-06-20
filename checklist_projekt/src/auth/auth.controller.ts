import { Controller, Post, UseGuards, Request, Get, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { LocalAuthGuard } from './guards/localAuth.guard';
import { JwtAuthGuard } from './guards/jwtAuth.guard';
import {UserRole} from "./roles/roles";
import {Roles} from "./roles/roles.decorator";
import {CaslGuard} from "./guards/CASL.guard";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async signIn(@Request() req, @Res() res: Response) {
        const jwt = req.user;
        res.setHeader('Set-Cookie', [jwt]);
        res.status(HttpStatus.OK).json({ message: 'Login successful' });
    }

    @UseGuards(JwtAuthGuard, CaslGuard)
    @Get('profile')
    @Roles(UserRole.USER)
    profile(@Request() req) {
        return req.user;
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    logout(@Request() req) {
        req.res.setHeader('Set-Cookie', `Access_token=; HttpOnly; Path=/; Max-Age=0`);
        req.res.status(HttpStatus.OK).json({ message: 'Logout successful' });

    }
}
