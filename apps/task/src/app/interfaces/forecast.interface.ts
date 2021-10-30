export interface ForecastInterface {
	daily?: DailyInterface[]
	hourly?: HourlyInterface[]
	lat: number
	lon: number
	name: string

}

export interface DailyInterface {
	temp: {
		day: number
	}
}

export interface HourlyInterface {
	temp: number
}

export interface ForecastDTOInterface {
	cityName: string
}
