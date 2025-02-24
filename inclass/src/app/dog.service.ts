import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { firstValueFrom, map, Observable, Subject } from "rxjs";
import { DogResults } from "./model";

// @Injectable({providedIn: 'root'}) //-> @Service layer
@Injectable()
export class DogService{

    //Autowired httpclient, RESTtemplate
    private http = inject(HttpClient)


    //for fetching the url to display as string
    newDogSearch = new Subject<string []>()


    //returns an observable in the format of DogResult model
    //consumer of this method must subscribe to see results
    getDogs(count =3): Observable<DogResults>{
        return this.http.get<DogResults>(`https://dog.ceo/api/breeds/image/random/${count}`)
    }


    //convert observable to promise using firstValueFrom
    getDogsAsPromise(count = 3): Promise<DogResults>{
        //convert observable -> promise, we can only take the 1st or last bit of the observable
        return firstValueFrom(this.http.get<DogResults>(`https://dog.ceo/api/breeds/image/random/${count}`))
    }

    //get a string [] instead with pipes, transforming data with pipes
    getDogsAsPromiseArray(count = 3): Promise<string []>{
        //convert observable -> promise, we can only take the 1st or last bit of the observable

        //OBSERVABLE
        // //manipulate observable with pipe, extract the message array from result
        // return firstValueFrom(
        //     this.http.get<DogResults>(`https://dog.ceo/api/breeds/image/random/${count}`)
        //      .pipe(
        //         map(result => result.message)
        // ))

        //PROMISE
        //convert observable into a promise with firstValueFrom and handle it using then and catch
        return firstValueFrom(
            this.http.get<DogResults>(`https://dog.ceo/api/breeds/image/random/${count}`)
            ).then(result => {
                this.newDogSearch.next(result.message) //anybody that subscribes will know
                return result.message
            })
            .catch(err=> {
                return ['https://pressable.com/wp-content/uploads/2018/04/common-wordpress-errors.jpg']
            })
    }

}