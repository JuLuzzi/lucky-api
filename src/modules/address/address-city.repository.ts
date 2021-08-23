import { EntityRepository, Repository } from "typeorm";
import { City } from './address-city.entity';

@EntityRepository(City)
export class CityRepository extends Repository<City>{}