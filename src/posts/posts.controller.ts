import { Controller, Post as HttpPost, Body, UseGuards, Request, Get, Param, Post, Delete, Patch, UseInterceptors } from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PostsDto } from './dto/posts.dto';
import { customInterceptor } from 'src/interceptors/custom.interceptor';

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) { }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(customInterceptor)
    @Post()
    createPost(@Body() postsDto: PostsDto, @Request() req) {
        return this.postsService.createPost(postsDto.title, postsDto.content, req.user.sub)
    }

    @UseInterceptors(customInterceptor) //used to hide user password in the response
    @Get()
    findAll() {
        return this.postsService.findAll();
    }

    @UseInterceptors(customInterceptor)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.postsService.findById(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(@Param('id') id: string, @Request() req) {
        const userId = req.user.sub;
        return this.postsService.remove(+id, userId);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Body() postsDto: PostsDto, @Param('id') id: string, @Request() req) {
        // console.log(postsDto);
        const userId = req.user.sub;
        return this.postsService.update(+id, userId, postsDto);
    }
}
