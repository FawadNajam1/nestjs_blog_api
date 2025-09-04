import { Controller, Param, Post, Request, UseGuards } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesDto } from './dto/like.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('likes')
export class LikesController {
    constructor(private readonly likesService: LikesService) {}

    @UseGuards(JwtAuthGuard)
    @Post('post/:id')
    likeAPost(@Param('id') id: number, @Request() req) {
        const user = req.user;
        return this.likesService.likePost(+id, user);
    }

    @UseGuards(JwtAuthGuard)
    @Post('comment/:id')
    likeAComment(@Param('id') id: number, @Request() req) {
        const user = req.user;
        return this.likesService.likeComment(+id, user)
    }
}
