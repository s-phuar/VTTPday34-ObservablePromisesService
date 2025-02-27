import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit{

  private fb = inject(FormBuilder)
  private weatherSvc = inject(WeatherService)


  protected form !:FormGroup


  ngOnInit(): void {
    this.form = this.createForm()  
  }

  protected search(){
    // const query = this.form.value['q']
    const query = this.form.value.q
    console.info('>>> query: ', query)
    this.weatherSvc.search(query) //returns promise<String>, READ WITH .THEN
      .then(results => {
        console.info('>>>results: ', results)
      })
  }





  createForm(): FormGroup{
    return this.fb.group({
      q: this.fb.control<string>('', [Validators.required, Validators.minLength(1)])
    })
  }





}
