import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersDto } from 'src/users/dto/users.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    register(@Body() dto: UsersDto) {
        return this.authService.register(dto.email, dto.password);
    }

    @Post('login')
    async login(@Body() dto: UsersDto) {
        return this.authService.validateUser(dto.email, dto.password)
        .then(user => this.authService.login(user));
    }
}
