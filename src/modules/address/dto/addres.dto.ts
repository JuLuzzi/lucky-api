import { IsNotEmpty } from 'class-validator';

export class AddressDto {
    @IsNotEmpty()
    street: string;

    @IsNotEmpty()
    city: string;

    @IsNotEmpty()
    country: string;
}