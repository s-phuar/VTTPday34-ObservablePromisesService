import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { firstValueFrom, map, Subject, tap } from "rxjs";

@Injectable()
export class WeatherService{

    private readonly API_URL = 'https://api.openweathermap.org/data/2.5/weather'
    private readonly API_KEY = 'bacd833dd68918978fba509e986ad505'

    private http = inject(HttpClient)

    //emit OBSERVABLE to display
    searchResults = new Subject<number>()



    search(city: string): Promise<number>{
        const params = new HttpParams()
            .set('q', city)
            .set('appid', this.API_KEY)

        //observable piped to just temp value
        return firstValueFrom<number>(this.http.get<any>(this.API_URL, {params})
            .pipe(
                map(data => {return data.main.temp}),
                tap(temp => {this.searchResults.next(temp)}) //pass temp number to subject
            ))
    }




}