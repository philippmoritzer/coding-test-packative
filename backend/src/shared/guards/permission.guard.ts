/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private readonly requiredPermission: string) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    const [, permissions] = authHeader.split(';').map((part) => part.trim());
    if (!permissions) {
      throw new ForbiddenException('No permissions found in the token');
    }
    const userPermissions = permissions.replace('permissions:', '').split(',');

    const hasPermission = userPermissions.includes(this.requiredPermission);

    if (!hasPermission) {
      throw new ForbiddenException(
        'User does not have the required permissions',
      );
    }

    return true;
  }
}
