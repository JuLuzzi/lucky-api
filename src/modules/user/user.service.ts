import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { getConnection } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from '../address/address.entity';
import { AddressDto } from '../address/dto/addres.dto';
import { UserProfileDto } from './dto/user.profile.dto';
import { User } from './user.entity';
import { UserProfile } from './user.profile.entity';
import { UserProfileRepository } from './user.profile.repository';
import { UserRepository } from './user.repository';

@Injectable()
export class UserProfileService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly _userRepository: UserRepository,
    ) {}

    async get(id: number): Promise<UserProfileDto> {
        if(!id){
            throw new BadRequestException("id must be sent");
        }

        const user: User = await this._userRepository.findOne(id);
        if(!user) {
            throw new NotFoundException("user not found");
        }

        const userProfile = await this.createUserProfileDto(user);
        return userProfile;
    }

    private async createUserProfileDto(user: User) {
        const userProfileDto: UserProfileDto = new UserProfileDto();
        userProfileDto.id = user.id;

        const userProfileRepository: UserProfileRepository = await getConnection().getRepository(
            UserProfile
        );
        const userProfile: UserProfile = await userProfileRepository.findOne({
            where: { user: user.id },
        });

        userProfileDto.name = userProfile.name;
        userProfileDto.address = await this.getAddress(userProfile.address);
        return userProfileDto;
    }

    private async getAddress(address: Address): Promise<AddressDto> {
        // create a builder
        const addressDto: AddressDto = new AddressDto();
        addressDto.street = address.street;
        addressDto.city = address.city.name;
        addressDto.country = address.city.country.name;
        return addressDto;
    }
}
