import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '../../shared/shared.module';
import { UserProfileRepository } from './user.profile.repository';
import { UserProfileService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [TypeOrmModule.forFeature([UserProfileRepository, UserRepository]), SharedModule, AuthModule],
    providers: [UserProfileService],
    controllers: [UserController],
})
export class UserModule {}
