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
  private dogSvc = inject(DogService)

  protected form !: FormGroup
  // catch the subscription
  private sub !:Subscription
  // catch status change
  private statusSub !:Subscription
  private statusSub2 !:Subscription
  private statusSub3 !:Subscription

  //demo statuschange with button
  count = 0
  images: string[] = []

  private counterSub = new Subject<number>()

  //we pushdata into a subject via next, data is pushed out via observable and witnessed by subscribe
  pushData(){
    this.count ++
    this.counterSub.next(this.count)
  }




  ngOnInit(): void {
    this.form = this.fb.group({
      name: this.fb.control<string>('', [Validators.required, Validators.minLength(5)]),
      address: this.fb.control<string>('', [Validators.required, Validators.minLength(5)])

    })  

  //ONLY thing dog related
  this.statusSub3 = this.dogSvc.newDogSearch.subscribe(
    (images) => this.images = images
  )


  this.statusSub2 = this.counterSub.subscribe({
    next: (data) => {console.info('>>> next: ', data)}
  })


  this.statusSub = this.form.statusChanges
    .pipe(
      debounceTime(2000), //value below comes immediately, changes comes 2 seconds later. Other uses like staggering calls to the backend
      map( value => value =="VALID")
    )
    .subscribe(
      (changes) => {
        console.info('>>> changes: ', changes)
      }
    )


  //stream of data
  this.sub = this.form.valueChanges.subscribe({
    next: (value) => {
      console.info('>> value: ', value)
    },
    error:(err) =>{
      console.error('>>> error: ', err)
    },
    complete: () => {
      console.info('>>> completed')
    }
  })
  }

  ngOnDestroy(): void {
    //unsub when the component is destroyed
    this.sub.unsubscribe()
    this.statusSub.unsubscribe()
    this.statusSub2.unsubscribe()
    this.statusSub3.unsubscribe()
  }



}
