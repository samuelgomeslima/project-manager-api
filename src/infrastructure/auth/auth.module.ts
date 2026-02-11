import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/domain/use-cases/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret, // Replace with your own secret key
      signOptions: { expiresIn: '1h' }, // Token expiration time
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
