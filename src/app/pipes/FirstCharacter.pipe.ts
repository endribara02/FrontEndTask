import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstCharacter'
})
export class FirstCharacterPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    value = value.replace(/[0-9]/g, '').trim();
    value = value.replace(/\W/g , '');

   return value.toUpperCase().charAt(0);
  }

}