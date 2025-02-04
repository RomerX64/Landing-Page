import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException(
        'No se encontró el usuario en la petición',
      );
    }

    if (!user.isAdmin) {
      throw new ForbiddenException(
        'Acceso denegado, se requiere ser administrador',
      );
    }

    return true;
  }
}
