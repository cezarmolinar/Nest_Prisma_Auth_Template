import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Roles } from '@prisma/client'
import { Request } from 'express'
import { Observable } from 'rxjs'

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.get<Roles[]>(
      'roles',
      context.getHandler()
    )
    if (!requiredRoles) {
      return true
    }

    const request: Request = context.switchToHttp().getRequest()
    const authUser = request.user

    if (!authUser) {
      return false
    }

    return (
      authUser.role === Roles.ADMIN || requiredRoles.includes(authUser.role)
    )
  }
}
