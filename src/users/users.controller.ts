import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { AuthGuard } from 'src/auth/auth.guard'
import { RoleGuard } from 'src/auth/role/role.guard'
import { RequiredRoles } from 'src/auth/required-roles.decorator'
import { Roles } from '@prisma/client'

@UseGuards(AuthGuard, RoleGuard)
@RequiredRoles(Roles.ADMIN)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto)
    return user
  }

  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id)
  }
}
