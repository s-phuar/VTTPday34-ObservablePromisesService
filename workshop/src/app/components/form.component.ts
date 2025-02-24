import { query } from '@angular/animations';
import { LiteralPrimitive } from '@angular/compiler';
import { Component, inject, OnInit, output, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { QueryParams } from '../model';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit{

  private fb = inject(FormBuilder)

  protected form !: FormGroup

  @Output()
  newQuery = new Subject<QueryParams>()


  ngOnInit(): void {
    this.form = this.fb.group({
      query: this.fb.control<string>('', [Validators.required]),
      limit: this.fb.control<number>(5),
      rating: this.fb.control<string>('g')
    })
  }

  //return custom query object
  protected search(): void{
    console.info('searching...')
    const queries: QueryParams = {
      query: this.form.controls['query'].value,
      limit: Number(this.form.controls['limit'].value),
      rating: this.form.controls['rating'].value      
    }
    this.newQuery.next(queries)
  }

  protected isInvalid(): boolean{
    return this.form.invalid
  }

  protected clearForm(){
    this.form.reset()
  }




}
