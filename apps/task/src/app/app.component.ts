import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, mergeMap, Observable, of } from 'rxjs';
import { GetForecast } from '../../../../libs/weather-forecast/state/app.actions';
import { Select, Store } from '@ngxs/store';
import { AppState } from '../../../../libs/weather-forecast/state/app.state';
import { ModeEnum } from './enums/mode-enum';
import { DailyInterface, HourlyInterface } from './interfaces/forecast.interface';

@Component({
	selector: 'bp-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
	@Select(AppState.getDailyForecast)
	public dailyForecast$!: Observable<DailyInterface[]>;
	@Select(AppState.getHourlyForecast)
	public hourlyForecast$!: Observable<HourlyInterface[]>;
	public city$!: Observable<string>;
	public Mode = ModeEnum;
	public modeValues = [ModeEnum.DAILY, ModeEnum.HOURLY];
	public form = this.formBuilder.group({
		city: [null, [Validators.required]],
		mode: [this.modeValues[0], [Validators.required]],
	});

	public get city(): AbstractControl {
		return <AbstractControl>this.form.get('city');
	}

	public get mode(): AbstractControl {
		return <AbstractControl>this.form.get('mode');
	}

	constructor(
		private formBuilder: FormBuilder,
		private store: Store,
	) {}

	public ngOnInit(): void {
		this.city$ = this.city.valueChanges
			.pipe(
				debounceTime(500),
				distinctUntilChanged(),
				mergeMap((cityName: string) =>  {
					this.store.dispatch(new GetForecast({ cityName }))
					return of(cityName)
				})
			)
	}

}
