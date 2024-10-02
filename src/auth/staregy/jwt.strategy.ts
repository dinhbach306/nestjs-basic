import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JwtStrategy.getSecretKey(configService),
    });
  }

  private static getSecretKey(configService: ConfigService): string {
    const jwtSecretKey = configService.get<string>('JWT_KEY_SECRET');
    if (!jwtSecretKey) {
      throw new Error('JWT_KEY_SECRET is not defined');
    }
    return jwtSecretKey;
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
