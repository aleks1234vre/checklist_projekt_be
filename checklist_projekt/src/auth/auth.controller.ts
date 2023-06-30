import {Controller, Post, UseGuards, Request, Get, Res, HttpStatus, Body, Patch, Delete} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { LocalAuthGuard } from './guards/localAuth.guard';
import { JwtAuthGuard } from './guards/jwtAuth.guard';
import { User } from '../entities/user.entity';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import {MinLength} from "class-validator";

class ChangePasswordDto {
    @MinLength(8, { message: 'New password must be longer than or equal to 8 characters' })
    newPassword: string;
}
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService, // Inject UserService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Patch('changepassword')
    async changePassword(
        @Request() req,
        @Body() changePasswordDto: ChangePasswordDto, // Use the validation DTO
        @Res() res: Response,
    ) {
        const userId = req.user.id;
        const user = await this.userService.findById(userId);

        // Compare the current password with the stored password
        const isMatch = await bcrypt.compare(req.body.currentPassword, user.password);

        if (isMatch) {
            // Hash the new password
            const hashedPassword = await bcrypt.hash(changePasswordDto.newPassword, 10);

            // Update the user's password
            user.password = hashedPassword;
            await this.userService.update(userId, user);

            res.status(HttpStatus.OK).json({ message: 'Password changed successfully' });
        } else {
            res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid current password' });
        }
    }

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

    @UseGuards(JwtAuthGuard)
    @Delete('deleteaccount')
    async deleteAccount(@Request() req, @Res() res: Response) {
        try {
            const userId = req.user.id;
            await this.userService.delete(userId);
            res.status(HttpStatus.OK).json({ message: 'Account deleted successfully' });
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error deleting account!!!!' });
        }
    }
}