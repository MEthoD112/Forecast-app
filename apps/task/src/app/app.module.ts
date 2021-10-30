import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store'
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { AppState } from '../../../../libs/weather-forecast/state/app.state';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';

@NgModule({
	declarations: [AppComponent, FilterPipePipe],
	imports: [
		BrowserModule,
		HttpClientModule,
		ReactiveFormsModule,
		NgxsModule.forRoot([AppState]),
		NgxsReduxDevtoolsPluginModule.forRoot(),
		NgxsLoggerPluginModule.forRoot(),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
