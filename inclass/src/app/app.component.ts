import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DogService } from './dog.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {

  //@Autowired DogService
  private dogSvc = inject(DogService)

  protected dogImages: string[] = []
  private sub !:Subscription

  //observable
  fetchDogImages(){
    this.sub = this.dogSvc.getDogs() //observable in the format of a dogresult object
      .subscribe({
        next:(results) => {
          console.info('>>> OBS result: ', results)
          this.dogImages = results.message
          console.info('>>> dog images result: ', this.dogImages)
        },
        error: (err) => {
          console.error('>>> error: ', err)
        },
        complete: () => {
          console.info('>>> completed!')
          this.sub.unsubscribe()
        }
      })
  }

  //promise, no need to check for completion (either resolved or rejected)
  fetchDogImageAsPromise(){
    this.dogSvc.getDogsAsPromise()
      .then(results => {
        console.info('>>> PROMISE results:', results)
        this.dogImages = results.message
        console.info('>>> dog images results:', this.dogImages)
      })
      .catch(err =>{
        console.error('>>> ERROR', err)
        alert(`ERROR: ${JSON.stringify(err)}`)
      })
  }

  //promise array
  fetchDogImageAsPromiseArray(){
    this.dogSvc.getDogsAsPromiseArray()
      .then(results => { //results is an array of strings here
        console.info('>>> ARRAY results:', results)
        this.dogImages = results //already an array
      })
      .catch(err =>{
        console.error('>>> ERROR', err)
        alert(`ERROR: ${JSON.stringify(err)}`)
      })
  }

  //summary
    //set timeOut non-blocking behaviour
    //subscribe to status and value changes observable stream
    //observable and completion
    //promise as a single result
    //pipes to chain operators (map etc.)




}
