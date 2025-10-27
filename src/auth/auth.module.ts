import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService): JwtModuleOptions => ({
        secret: cfg.getOrThrow<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: (cfg.get<string>('JWT_EXPIRES') ??
            '7d') as `${number}${'m' | 'h' | 'd'}`,
        },
      }),
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
