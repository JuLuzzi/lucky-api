import { IsNotEmpty } from 'class-validator';
import { AddressDto } from '../../address/dto/addres.dto';

export class UserProfileDto {
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    address: AddressDto;
}