import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { WeatherService } from './weather.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './components/form.component';
import { WeatherDisplayComponent } from './components/weather-display.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    WeatherDisplayComponent
  ],
  imports: [
    BrowserModule, ReactiveFormsModule
  ],
  providers: [provideHttpClient(), WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
