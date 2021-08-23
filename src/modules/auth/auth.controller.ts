import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingInDto, SingUpDto } from './dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly _authService: AuthService) {}

    @Post('/singup')
    @UsePipes(ValidationPipe)
    async singup(@Body() singupDto: SingUpDto): Promise<void> {
        return this._authService.singup(singupDto);
    }
    
    @Post('/singin')
    @UsePipes(ValidationPipe)
    async singin(@Body() singinDto: SingInDto) {
        return this._authService.singin(singinDto);
    }
}
