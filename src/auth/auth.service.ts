import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwt: JwtService) {}

    async validateUser(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);
        if(user && await argon2.verify(user.password, password)) {
            const {password, ...userData} = user;
            return userData;
        }
        throw new UnauthorizedException('Invalid Credentials');
    }

    async login(user: any) {
        const payload = {email: user.email, sub: user.id};
        return {
            message: "User Logged In Successfully.",
            access_token: this.jwt.sign(payload),
        }
    }

    async register(email: string, password: string) {
        const existingUser = await this.usersService.findByEmail(email);
        if(existingUser) {
            throw new ConflictException('Email is already registered.');
        }
        
        const hashed = await argon2.hash(password);
        const newUser = await this.usersService.createUser(email, hashed);

        return {
            message: "User Registered Successfully.",
            userId: newUser.id,
            email: newUser.email
        };
    }
}
