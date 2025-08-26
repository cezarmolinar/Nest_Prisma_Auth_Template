import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreatePostDto } from './dto/create-post.dto'

@Injectable()
export class PostsService {
  constructor(private prismaService: PrismaService) {}

  create(createPostDto: CreatePostDto & { authorId: number }) {
    return this.prismaService.post.create({
      data: createPostDto
    })
  }

  findAll() {
    return this.prismaService.post.findMany()
  }

  findOne(id: number) {
    return this.prismaService.post.findUnique({
      where: { id }
    })
  }

  remove(id: number) {
    return this.prismaService.post.delete({
      where: { id }
    })
  }
}
