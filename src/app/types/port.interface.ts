import { ICountry } from './country.interface';

export class IPort {
  id: number;
  name: string;
  country?: ICountry;
}
