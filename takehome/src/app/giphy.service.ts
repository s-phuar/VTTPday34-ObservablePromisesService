import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { firstValueFrom, map, Subject, tap } from "rxjs";
import { SearchCriteria } from "./models";

@Injectable()
export class GiphyService{
    private readonly API_URL = 'https://api.giphy.com/v1/gifs/search'
    private readonly API_KEY = 'EfVCfprodIZ47Hfw6ff49vnaF0E61BeM'

    private http = inject(HttpClient)

    searchResults = new Subject<string[]>()

    clearResults(){
        this.searchResults.next([])
    }


    //last tap first event to image component
    search(criteria: SearchCriteria): Promise<string[]> {
        const params = new HttpParams()
            .set('api_key', this.API_KEY)
            .set('q', criteria.q)
            .set('limit', criteria.limit)
            .set('rating', criteria.rating)
        
        //transform this observable using pipe and maps
        return firstValueFrom<string[]>(
            this.http.get<any>('https://api.giphy.com/v1/gifs/search', { params }) //this should net us the whole json
            //json object -> data json array holding multiple unnamed objects -> image object -> fixed height object -> url key
            .pipe(
                tap(result => {
                    console.info('>>>> TAP-0: ', result)
                }),
            map(result => result['data']), //return data json array, can use result.data as well
                tap(result => {
                    console.info('>>>> TAP-1: ', result)
                }),
              //return array of image urls
            map((data: any[]) => data.map((unnamedObj: any) => unnamedObj.images.fixed_height.url)),  //data is a json array of multiple objects
              // fixed_height -> string[]
              //send observable, which is an array of string urls, as event
                tap(images => {
                    console.info('>>>> TAP-2: ', images)
                    this.searchResults.next(images)
                })
            )
          )
          // .then(result => {
          //   this.searchResults.next(result)
          //   return result
          // })
        }



}