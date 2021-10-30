import { Action, Selector, State, StateContext } from '@ngxs/store';
import { IApplicationState } from './app.model';
import { WeatherForecastApiService } from '../services/src';
import { GetForecast } from './app.actions';
import { catchError, forkJoin, map, of, switchMap, tap, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { CoordinatesInterfaces } from '../../../apps/task/src/app/interfaces/coordinates-interfaces';
import { DailyInterface, HourlyInterface } from '../../../apps/task/src/app/interfaces/forecast.interface';

export class AppStateModel {
	dailyForecast: DailyInterface[] = [];
	hourlyForecast: HourlyInterface[] = [];
}

@State<AppStateModel>({
	name: 'application',
	defaults: {
		dailyForecast: [],
		hourlyForecast: [],
	}
})
@Injectable()
export class AppState {

	constructor(private weatherForecastApiService: WeatherForecastApiService) {}

	@Selector()
	static getDailyForecast(state: AppStateModel) {
		return state.dailyForecast;
	}

	@Selector()
	static getHourlyForecast(state: AppStateModel) {
		return state.hourlyForecast;
	}

	@Action(GetForecast)
	getForecast(
		ctx: StateContext<IApplicationState>,
		action: GetForecast
	) {
		return of(action.payload?.cityName).pipe(
			switchMap((value: string) =>  {
				return this.weatherForecastApiService.getCoordinates(value);
			}),
			map((result: CoordinatesInterfaces) => ({ lat: result?.lat, lon: result?.lon })),
			switchMap((res: CoordinatesInterfaces) =>  {
				if (res.lat && res.lon) {
					return forkJoin([
						this.weatherForecastApiService.getDailyForeCast(res),
						this.weatherForecastApiService.getHourlyForeCast(res)
					])
				}
				return of ([[], []])
			}),
			tap(result => {
				ctx.patchState({
					dailyForecast: result[0],
					hourlyForecast: result[1]
				})
			}),
			catchError((error) => {
				ctx.patchState({
					dailyForecast: [],
					hourlyForecast: [],
				})
				return throwError(error)
			})
		)
	}
}
