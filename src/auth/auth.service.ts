import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<{ access_token: string }> {
    const result = await this.usersService.comparePassword(email, password);
    if (!result.isCompare) throw new UnauthorizedException();

    const payload = { sub: result.userId }; // Assuming the correct property is 'id'
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
