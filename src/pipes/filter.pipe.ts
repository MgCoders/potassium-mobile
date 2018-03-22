import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  segunda: number = 0;

  transform(items: any, filter: any, isAnd: boolean): any {

    //El contador de mierda este es porque hay entra dos veces al principio y arruina la lista.
    //Habría que estudiarlo bien
    this.segunda++;
    //console.log('segunda: '+this.segunda);

    if ((this.segunda !== 2) && Array.isArray(items)) {
      let filterKeys = Object.keys(filter);
      if (isAnd) {
        return items.filter(item =>
          filterKeys.reduce((memo, keyName) =>
            (memo && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] === "", true));
      } else {
        return items.filter(item => {
          return filterKeys.some((keyName) => {
            //console.log(keyName);
            return new RegExp(filter[keyName], 'gi').test(item[keyName]) || filter[keyName] === "";
          });
        });
      }
    } else {
      //console.log('todos');
      //console.log(items);
      return items;
    }

  }
}
