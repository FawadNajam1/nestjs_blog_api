import { Body, Controller, Get, Param, Post, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { customInterceptor } from 'src/interceptors/custom.interceptor';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentService: CommentsService) {}

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access_token')
    @Post()
    create(@Body() body: CreateCommentDto, @Request() req) {
        return this.commentService.createComment(body, req.user.sub);
    }

    @UseInterceptors(customInterceptor)
    @Get('/post/:postId')
    findByPost(@Param('postId') postId: number) {
        return this.commentService.findCommentsByPost(postId);
    }
}
