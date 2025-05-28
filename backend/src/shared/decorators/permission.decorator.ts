import { applyDecorators, UseGuards } from '@nestjs/common';
import { PermissionGuard } from '../guards/permission.guard';

export function Permission(requiredPermission: string) {
  return applyDecorators(UseGuards(new PermissionGuard(requiredPermission)));
}
