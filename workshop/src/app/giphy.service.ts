import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { GiphyResults, QueryParams } from "./model";
import { firstValueFrom } from "rxjs";


@Injectable()
export class giphyService{

    private http = inject(HttpClient)
    private readonly API_URL = 'https://api.giphy.com/v1/gifs/search'
    private readonly API_KEY = 'EfVCfprodIZ47Hfw6ff49vnaF0E61BeM'


    searchGIF(terms: QueryParams): Promise<GiphyResults>{
        const params = new HttpParams()
            .set('api_key', this.API_KEY)
            .set('q', terms.query.replace('', '+')) //whitespace to plus
            .set('limit', terms.limit)
            .set('rating', terms.rating)
        return firstValueFrom(this.http.get<GiphyResults>(this.API_URL, {params}))
    }


}