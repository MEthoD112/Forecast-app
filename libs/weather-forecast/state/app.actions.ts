import { ForecastDTOInterface } from '../../../apps/task/src/app/interfaces/forecast.interface';

export class GetForecast {
	static readonly type = '[App] GetForecast';
	constructor(public payload: ForecastDTOInterface) {}
}
