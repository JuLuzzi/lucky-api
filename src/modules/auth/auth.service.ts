import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { SingInDto, SingUpDto } from './dto';
import { User } from '../user/user.entity';
import { compare } from 'bcryptjs';
import { IJwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(

        @InjectRepository(AuthRepository)
        private readonly _authRepository: AuthRepository,
        private readonly _jwtService: JwtService
    ){}

    async singup(singupDto: SingUpDto): Promise<void> {
        const {username} = singupDto;
        const userExist = await this._authRepository.findOne({
            where: { username }
        });

        if(userExist){
            throw new ConflictException('username already exists');
        }

        return this._authRepository.singUp(singupDto);
    }

    async singin(singinDto: SingInDto): Promise<{token: string}> {
        const {username, password} = singinDto;
        const user: User = await this._authRepository.findOne({
            where: { username },
        });

        if(!username){
            throw new NotFoundException('user not found');
        }

        const isMatch = await compare(password, user.password);

        if(!isMatch) {
            throw new UnauthorizedException('invalid credentials');
        }

        const payload: IJwtPayload = {
            id: user.id,
            username: user.username
        }
        const token = await this._jwtService.sign(payload);
        return { token };
    }

}
