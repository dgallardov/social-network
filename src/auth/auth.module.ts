import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule ,ConfigService } from '@nestjs/config';

@Module({
    imports:[
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async(configService : ConfigService) => ({
                secret: configService.get<String>('JWT_SECRET'),
                signOptions:{expiresIn:'60m'}
            })
            
        })
    ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
