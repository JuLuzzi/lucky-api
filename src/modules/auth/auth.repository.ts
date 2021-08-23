import { getConnection , EntityRepository, Repository } from "typeorm";
import { City } from "../address/address-city.entity";
import { CityRepository } from "../address/address-city.repository";
import { Address } from "../address/address.entity";
import { User } from "../user/user.entity";
import { UserProfile } from "../user/user-profile.entity";
import { SingUpDto } from "./dto";
import { genSalt, hash } from 'bcryptjs';
import { AddressRepository } from "../address/address.repository";

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
    async singUp(singupDto: SingUpDto){
        const {username,password,name,address,cityId} = singupDto;

        //make a trx and handle errors 
        const createdUser = await this.createUser(username, password);
        const createdAddress = await this.createAddress(address, cityId);
        const createdUserProfile = await this.createUserProfile(createdUser, createdAddress, name);
    }

    private async createUser(username: string, password: string) {
        const userToSave = new User();
        userToSave.username = username;
        const salt = await genSalt(10);
        userToSave.password = await hash(password, salt);
        const userSaved = userToSave.save();
        return userSaved;
    }

    private createUserProfile(user: User, address: Address, name: string) {
        const userProfileToSave = new UserProfile();
        userProfileToSave.name = name;
        userProfileToSave.user = user;
        userProfileToSave.address = address;
        const userProfileSaved = userProfileToSave.save();
        return userProfileSaved;
    }

    private async createAddress(address: string, cityId: number) {
        const addressToSave = new Address();
        addressToSave.street = address;
        
        addressToSave.city = await this.getCity(cityId, addressToSave);

        const gettedAddress: Address = await this.getAddress(addressToSave);
        if(gettedAddress){
            return gettedAddress;
        }

        const addressSaved = addressToSave.save();
        return addressSaved;
    }

    private async getAddress(addressToSave: Address) {
        const addressRepository: AddressRepository = await getConnection().getRepository(
            Address
        );
        const gettedAddress: Address = await addressRepository.findOne({
            where: { street: addressToSave.street, city: addressToSave.city.id },
        });
        return gettedAddress;
    }

    private async getCity(cityId: number, addressToSave: Address): Promise<City> {
        const cityRepository: CityRepository = await getConnection().getRepository(
            City
        );

        const city: City = await cityRepository.findOne({
            where: { id: cityId },
        });
        return city;
    }

}
