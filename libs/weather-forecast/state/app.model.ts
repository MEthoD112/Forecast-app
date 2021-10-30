import { DailyInterface, HourlyInterface } from '../../../apps/task/src/app/interfaces/forecast.interface';

export interface IApplicationState {
	dailyForecast: DailyInterface[];
	hourlyForecast: HourlyInterface[];
}
