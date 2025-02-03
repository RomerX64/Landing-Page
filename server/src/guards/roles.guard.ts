import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roles } from 'src/Modules/User/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const rolesRequired = this.reflector.getAllAndOverride<Roles[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    const req = context.switchToHttp().getRequest();
    const user = req.user;

    const hasRole = () =>
      rolesRequired.some((role) => user?.roles?.includes(role));
    const valid = user && user.roles && hasRole();
    if (!valid)
      throw new HttpException(
        'you do not have permission and are not allowed to acces this route',
        HttpStatus.UNAUTHORIZED,
      );
    return valid;
  }
}
