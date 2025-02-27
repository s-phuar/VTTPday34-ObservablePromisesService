import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weather-display',
  standalone: false,
  templateUrl: './weather-display.component.html',
  styleUrl: './weather-display.component.css'
})
export class WeatherDisplayComponent  implements OnInit, OnDestroy{

  private weatherSvc = inject(WeatherService)
  //subscribe to observable
  private sub !: Subscription
  temp: number = 0


  ngOnInit(): void {
    this.weatherSvc.searchResults.subscribe({
      next:(temp) => this.temp = temp
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }






}
