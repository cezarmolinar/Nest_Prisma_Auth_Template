import { Injectable, UnauthorizedException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
// import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service'
import * as bcrypt from 'bcrypt'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const userAlreadyExists = await this.findByEmail(createUserDto.email)
    if (userAlreadyExists) {
      throw new UnauthorizedException('User already exists')
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10)

    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword
      }
    })

    return {
      id: user.id,
      email: user.email,
      name: user.name
    }
  }

  async findAll() {
    return this.prisma.user.findMany()
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email }
    })
  }
  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id }
    })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = updateUserDto
    return `This action updates a #${id} user with data: ${JSON.stringify(user)}`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
