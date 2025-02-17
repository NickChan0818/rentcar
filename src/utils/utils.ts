import { BadRequestException } from '@nestjs/common';

export function validateId(id: string): number {
  const userId = Number(id);
  if (isNaN(userId)) {
    throw new BadRequestException('Invalid user id');
  }
  return userId;
}
