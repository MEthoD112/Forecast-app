import { Pipe, PipeTransform } from '@angular/core';
import { HourlyInterface } from '../interfaces/forecast.interface';

@Pipe({
  	name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

	transform(value: HourlyInterface[]): HourlyInterface[] {
		return value?.filter((value, index) => index % 6 == 0);
	}

}
