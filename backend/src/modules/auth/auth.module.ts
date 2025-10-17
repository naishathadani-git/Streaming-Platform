import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from '../../services/auth/auth.service';
import { JwtStrategy } from '../../services/auth/jwt.strategy';
import { AuthController } from '../../controllers/auth/auth.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'mock-secret-key', // use env in real apps
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
