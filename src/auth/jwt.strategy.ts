import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private ConfigService: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: ConfigService.get('JWT_SECRET'),
    });
  }

  async validate({ id }: Pick<User, 'id'>) {
    return this.prisma.user.findUnique({ where: { id: +id } });
  }
}
