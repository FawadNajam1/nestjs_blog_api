import { Controller, Param, Post, Request, UseGuards } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesDto } from './dto/like.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access_token')
@Controller('likes')
export class LikesController {
    constructor(private readonly likesService: LikesService) {}

    @Post('post/:id')
    likeAPost(@Param('id') id: number, @Request() req) {
        const user = req.user;
        return this.likesService.likePost(+id, user);
    }

    @Post('comment/:id')
    likeAComment(@Param('id') id: number, @Request() req) {
        const user = req.user;
        return this.likesService.likeComment(+id, user)
    }
}
