import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, StatusChangeEvent, Validators } from '@angular/forms';
import { debounceTime, map, Subject, Subscription } from 'rxjs';
import { DogService } from '../dog.service';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit, OnDestroy{

  private fb = inject(FormBuilder)
  //dog related
  private dogSvc = inject(DogService)
  images: string[] = []

  protected form !: FormGroup
  // catch the subscription
  private sub !:Subscription
  // catch status change
  private statusSub !:Subscription
  private statusSub2 !:Subscription
  private statusSub3 !:Subscription

  //demo statuschange with button
  count = 0

  //a subject is a type of observable, it can emit values and have subscribe listen to it
  //events are NOT observables
  private counterSub = new Subject<number>()

  //we pushdata into a subject via next, data is pushed out via observable and witnessed by subscribe
  pushData(){
    this.count ++
    this.counterSub.next(this.count)
  }


  ngOnInit(): void {
    //1. simple example of setTimeout for non-blocking behaviour, see console output
    console.log("Start");

    setTimeout(() => {
      console.log("This runs after 2 seconds");
    }, 2000);  // 2 seconds delay
    
    console.log("End");

    //2. regular form init
    this.form = this.fb.group({
      name: this.fb.control<string>('', [Validators.required, Validators.minLength(5)]),
      address: this.fb.control<string>('', [Validators.required, Validators.minLength(5)])
    })

    //3. subsribe to counter pusher
    this.statusSub2 = this.counterSub.subscribe({
      next: (dataName) => {console.info('>>> next: ', dataName)}
    })

    //4. listens to form status changes as stream
      //observable that emits the status "changes" of the form (VALID, INVALID, PENDING, DISABLED)
    this.statusSub = this.form.statusChanges
      .pipe( //pipe will chain debounce and map operators
        debounceTime(2000), //debounce prevents too many calls to the back end, only calls 2 seconds after last change
        map( value => value =="VALID")//status value is mapped to boolean
      )
      .subscribe(
        (changes) => {
          console.info('>>> changes: ', changes) //output validity status of the form
        }
      )

    //listens to form value changes as stream, updates console constantly
    this.sub = this.form.valueChanges.subscribe({
      next: (valueXD) => {
        console.info('>> value: ', valueXD)
      },
      error:(errXD) =>{
        console.error('>>> error: ', errXD)
      },
      complete: () => {
        console.info('>>> completed')
      }
    })


    //ONLY thing dog related
    this.statusSub3 = this.dogSvc.newDogSearch.subscribe(
      (images) => this.images = images
    )

  }

  

  ngOnDestroy(): void {
    //unsub when the component is destroyed
    this.sub.unsubscribe()
    this.statusSub.unsubscribe()
    this.statusSub2.unsubscribe()
    this.statusSub3.unsubscribe()
  }



}
