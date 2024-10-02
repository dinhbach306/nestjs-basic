import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly logger = new Logger(JwtStrategy.name),
    private readonly configService: ConfigService,
  ) {
    const jwtSecretKey =
      'ad15f42f7cee40b1568cb14843a5fcefcbf4b44cf4feb4609b37e5e454835992';
    if (!jwtSecretKey) {
      logger.error('JWT_KEY_SECRET is not defined');
      throw new Error('JWT_KEY_SECRET is not defined');
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecretKey,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
