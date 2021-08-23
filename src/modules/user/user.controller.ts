import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UserProfileService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { UserProfileDto } from './dto/user.profile.dto';

@Controller('user')
export class UserController {
    constructor(private readonly _userProfileService: UserProfileService) {}

    @UseGuards(AuthGuard())
    @Get(':id')
    async getUserProfile(@Param('id', ParseIntPipe) id: number): Promise<UserProfileDto> {
        const user = await this._userProfileService.get(id);
        return user;
    }
    
}
