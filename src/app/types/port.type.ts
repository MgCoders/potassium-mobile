import { ICountry } from './country.interface';
import { IPort } from './port.interface';

export class Port implements IPort {
  id: number;
  name: string;
  country?: ICountry;

  constructor(port: IPort) {
    this.id = port.id;
    this.name = port.name;
    this.country = port.country;
  }
}
