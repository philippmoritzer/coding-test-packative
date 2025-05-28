/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const GetUserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      throw new Error('Authorization header is missing');
    }

    // Extract the user ID from the Authorization header
    const userId = decodeTokenAndExtractUserId(authHeader);
    return userId;
  },
);

// Helper function to decode the token and extract the user ID
function decodeTokenAndExtractUserId(authHeader: string): string {
  // Split the header into parts using ';' as the delimiter
  const parts = authHeader.split(';');
  // Find the part that starts with 'userId:'
  const userIdPart = parts.find((part) => part.trim().startsWith('userId:'));
  if (!userIdPart) {
    throw new UnauthorizedException('userId not found in Authorization header');
  }
  // Extract and return the userId value
  return userIdPart.split(':')[1].trim();
}
