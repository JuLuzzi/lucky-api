import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfileRepository } from './user.profile.repository';
import { UserProfileService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [TypeOrmModule.forFeature([UserProfileRepository, UserRepository]), AuthModule],
    providers: [UserProfileService],
    controllers: [UserController],
})
export class UserModule {}
