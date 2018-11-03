import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { delay } from 'rxjs/operators';
import { Country, Port } from '../types';

@Injectable()
export class PortService {
  private countries: Country[] = [new Country({
    id: 0,
    name: 'Japan',
    flag: 'jp',
    ports: [
      { id: 0, name: 'Tokai' }
    ]
  }), new Country({
    id: 2,
    name: 'Russia',
    flag: 'ru',
    ports: [
      { id: 2, name: 'Vladivostok' }
    ]
  }), new Country({
    id: 3,
    name: 'India',
    flag: 'in',
    ports: [
      { id: 3, name: 'Navlakhi' }
    ]
  }), new Country({
    id: 4,
    name: 'Cayman Islands',
    flag: 'ky',
    ports: [
      { id: 4, name: 'Cayman Brac' }
    ]
  }), new Country({
    id: 6,
    name: 'Egypt',
    flag: 'eg',
    ports: [
      { id: 6, name: 'Port Ibrahim' }
    ]
  }), new Country({
    id: 7,
    name: 'Finland',
    flag: 'fi',
    ports: [
      { id: 7, name: 'Brahestad' },
      { id: 37, name: 'Kantvik' }
    ]
  }), new Country({
    id: 8,
    name: 'Germany',
    flag: 'ge',
    ports: [
      { id: 8, name: 'Brake' }
    ]
  }), new Country({
    id: 9,
    name: 'Canada',
    flag: 'ca',
    ports: [
      { id: 9, name: 'Hantsport NS' }
    ]
  }), new Country({
    id: 11,
    name: 'Chile',
    flag: 'cl',
    ports: [
      { id: 11, name: 'Antofagasta' },
      { id: 12, name: 'San Antonio' },
      { id: 13, name: 'Santa Barbara' }
    ]
  }), new Country({
    id: 12,
    name: 'Argentina',
    flag: 'ar',
    ports: [
      { id: 14, name: 'Cabo San Antonio' },
      { id: 15, name: 'Diamante' },
      { id: 16, name: 'San Antonio Este Arg' },
      { id: 44, name: 'Santa Cruz' }
    ]
  }), new Country({
    id: 13,
    name: 'Curacao',
    flag: 'cw',
    ports: [
      { id: 17, name: 'Santa Anna Bay' }
    ]
  }), new Country({
    id: 14,
    name: 'Sri Lanka',
    flag: 'lk',
    ports: [
      { id: 18, name: 'Hambantota' }
    ]
  }), new Country({
    id: 15,
    name: 'Madagascar',
    flag: 'mg',
    ports: [
      { id: 19, name: 'Antananarivo' }
    ]
  }), new Country({
    id: 5,
    name: 'Brazil',
    flag: 'br',
    ports: [
      { id: 51, name: 'Areia Branca' },
      { id: 52, name: 'Navegantes' },
      { id: 53, name: 'Antonina' },
      { id: 54, name: 'Santos' },
      { id: 55, name: 'Paranagua' },
      { id: 56, name: 'Sao Francisco do Sul' },
      { id: 57, name: 'Angra dos Reis' },
      { id: 58, name: 'Rio de Janeiro' },
      { id: 59, name: 'Vitoria' },
      { id: 60, name: 'Porto Alegre' },
      { id: 61, name: 'Itajai' },
      { id: 62, name: 'Imbituba' },
      { id: 63, name: 'Pelotas' },
      { id: 64, name: 'Tubarao' },
      { id: 65, name: 'Fortaleza' },
      { id: 66, name: 'Cabedelo' },
      { id: 67, name: 'Sao Luis' },
      { id: 68, name: 'Natal' },
      { id: 69, name: 'Trombetas' }
    ]
  }), new Country({
    id: 16,
    name: 'Ireland',
    flag: 'ie',
    ports: [
      { id: 21, name: 'Bantry Bay' }
    ]
  }), new Country({
    id: 17,
    name: 'Italy',
    flag: 'it',
    ports: [
      { id: 22, name: 'Porto Levante' }
    ]
  }), new Country({
    id: 18,
    name: 'Greece',
    flag: 'gr',
    ports: [
      { id: 23, name: 'Port of Antikyra' }
    ]
  }), new Country({
    id: 19,
    name: 'Malaysia',
    flag: 'my',
    ports: [
      { id: 38, name: 'Kuantan' },
      { id: 24, name: 'Berantai FPSO' }
    ]
  }), new Country({
    id: 20,
    name: 'Spain',
    flag: 'es',
    ports: [
      { id: 25, name: 'Alicante' },
      { id: 45, name: 'Santa Eugenia De Riveira' }
    ]
  }), new Country({
    id: 21,
    name: 'Panama',
    flag: 'pa',
    ports: [
      { id: 26, name: 'Almirante' }
    ]
  }), new Country({
    id: 22,
    name: 'China',
    flag: 'cn',
    ports: [
      { id: 39, name: 'Lantian' },
      { id: 27, name: 'Canton' },
      { id: 42, name: 'Nantong' }
    ]
  }), new Country({
    id: 23,
    name: 'Somalia',
    flag: 'so',
    ports: [
      { id: 28, name: 'Dante' }
    ]
  }), new Country({
    id: 24,
    name: 'United States',
    flag: 'us',
    ports: [
      { id: 29, name: 'Davant LA' }
    ]
  }), new Country({
    id: 25,
    name: 'Australia',
    flag: 'au',
    ports: [
      { id: 30, name: 'Fremantle' }
    ]
  }), new Country({
    id: 26,
    name: 'Philippines',
    flag: 'ph',
    ports: [
      { id: 31, name: 'General Santos' }
    ]
  }), new Country({
    id: 27,
    name: 'United Kingdom',
    flag: 'gb',
    ports: [
      { id: 32, name: 'Granton' }
    ]
  }), new Country({
    id: 28,
    name: 'Venezuela',
    flag: 've',
    ports: [
      { id: 33, name: 'Guanta' }
    ]
  }), new Country({
    id: 29,
    name: 'Indonesia',
    flag: 'id',
    ports: [
      { id: 35, name: 'Kalimantan' }
    ]
  }), new Country({
    id: 30,
    name: 'Thailand',
    flag: 'th',
    ports: [
      { id: 36, name: 'Kantang' }
    ]
  }), new Country({
    id: 31,
    name: 'Ecuador',
    flag: 'ec',
    ports: [
      { id: 40, name: 'Manta' }
    ]
  }), new Country({
    id: 32,
    name: 'France',
    flag: 'fr',
    ports: [
      { id: 41, name: 'Mantes' }
    ]
  })];

  getCountries(page?: number, size?: number): Country[] {
    let countries = [];

    if (page && size) {
      countries = this.countries.slice((page - 1) * size, ((page - 1) * size) + size);
    } else {
      countries = this.countries;
    }

    return countries;
  }

  getPorts(page?: number, size?: number): Port[] {
    let ports = [];

    this.countries.forEach(country => {
      country.ports.forEach(port => {
        port.country = country;
        ports.push(port);
      });
    });

    if (page && size) {
      ports = ports.slice((page - 1) * size, ((page - 1) * size) + size);
    }

    return ports;
  }

  getPortsAsync(page?: number, size?: number, timeout = 1000): Observable<Port[]> {
    return new Observable<Port[]>(observer => {
      observer.next(this.getPorts(page, size));
      observer.complete();
    }).pipe(delay(timeout));
  }
}
