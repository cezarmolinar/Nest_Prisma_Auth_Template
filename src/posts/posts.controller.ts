import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  UseGuards
} from '@nestjs/common'
import { PostsService } from './posts.service'
import { CreatePostDto } from './dto/create-post.dto'
import type { Request } from 'express'
import { AuthGuard } from 'src/auth/auth.guard'
import { RequiredRoles } from 'src/auth/required-roles.decorator'
import { Roles } from '@prisma/client'
import { RoleGuard } from 'src/auth/role/role.guard'

@UseGuards(AuthGuard, RoleGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @RequiredRoles(Roles.WRITER, Roles.EDITOR)
  @Post()
  create(@Body() createPostDto: CreatePostDto, @Req() req: Request) {
    console.log('POST Controller', createPostDto)
    return this.postsService.create({
      ...createPostDto,
      authorId: req.user!.id
    })
  }

  @Get()
  findAll() {
    return this.postsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id)
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
  //   return this.postsService.update(+id, updatePostDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id)
  }
}
