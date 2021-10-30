import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { CoordinatesInterfaces } from '../../../../../apps/task/src/app/interfaces/coordinates-interfaces';
import { DailyInterface, ForecastInterface, HourlyInterface } from '../../../../../apps/task/src/app/interfaces/forecast.interface';

@Injectable({providedIn: 'root'})
export class WeatherForecastApiService {

	private _apiKey = '010721642521f31b0fbc8c3831d45951';
	private baseUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}';
	private getCoordinatesUrl = `http://api.openweathermap.org/geo/1.0/direct?q={city name}&limit=1&appid=${this._apiKey}`;
	private getDailyForeCastUrl = `${this.baseUrl}&exclude=current,minutely,hourly,alerts&appid=${this._apiKey}`;
	private getHourlyForeCastUrl = `${this.baseUrl}&exclude=current,minutely,daily,alerts&appid=${this._apiKey}`;

	constructor(private http: HttpClient) {
	}

	public getCoordinates(cityName: string): Observable<CoordinatesInterfaces> {
		const url = this.getCoordinatesUrl.replace('{city name}', cityName);
		return this.http.get<CoordinatesInterfaces[]>(url).pipe(map(response => response[0]));
	}

	public getDailyForeCast(coordinates: CoordinatesInterfaces): Observable<DailyInterface[]> {
		if (coordinates) {
			const url = this.getDailyForeCastUrl.replace('{lat}', coordinates.lat?.toString()).replace('{lon}', coordinates.lon?.toString());
			return this.http.get<ForecastInterface>(url)
				.pipe(
					map(forecast => forecast.daily as DailyInterface[])
				);
		} else {
			return of([])
		}

	}

	public getHourlyForeCast(coordinates: CoordinatesInterfaces): Observable<HourlyInterface[]> {
		if (coordinates) {
			const url = this.getHourlyForeCastUrl.replace('{lat}', coordinates.lat?.toString()).replace('{lon}', coordinates.lon?.toString());
			return this.http.get<ForecastInterface>(url).pipe(
				map(forecast => forecast.hourly as HourlyInterface[])
			);
		} else {
			return of([])
		}

	}

}
