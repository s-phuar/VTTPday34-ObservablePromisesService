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


  //promise
  fetchDogImageAsPromiseArray(){
    this.dogSvc.getDogsAsPromiseArray()
      .then(results => {
        console.info('>>> ARRAY results:', results)
        this.dogImages = results //already an array
      })
      .catch(err =>{
        console.error('>>> ERROR', err)
        alert(`ERROR: ${JSON.stringify(err)}`)
      })
  }

  //promise
  fetchDogImageAsPromise(){
    this.dogSvc.getDogsAsPromise()
      .then(results => {
        console.info('>>> PROMISE results:', results)
        this.dogImages = results.message
      })
      .catch(err =>{
        console.error('>>> ERROR', err)
        alert(`ERROR: ${JSON.stringify(err)}`)
      })
  }

  //observable
  fetchDogImages(){
    this.sub = this.dogSvc.getDogs()
      .subscribe({
        next:(results) => {
          console.info('>>> OBS result: ', results)
          this.dogImages = results.message
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




}
