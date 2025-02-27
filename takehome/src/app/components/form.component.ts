import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GiphyService } from '../giphy.service';
import { SearchCriteria } from '../models';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit{


  private fb = inject(FormBuilder)
  private giphySvc = inject(GiphyService)

  protected searchForm !: FormGroup
  //limit default is 5
  protected resultsCount = 5


  ngOnInit(): void {
    this.searchForm = this.createSearchForm()
  }

  //grab current state of the form, giphySvc search
  protected search(){
    const criteria: SearchCriteria = this.searchForm.value 
    console.info('>>> criteria: ', criteria)
    this.giphySvc.search(criteria) //returns Promise<string[]>
      .then(results => {
        console.info('>>> results: ', results )
      })
  }


  //reset to base
  protected clear(){
    this.searchForm = this.createSearchForm()
    this.giphySvc.clearResults()
  }

  limitUpdated($event: any){
    this.resultsCount = parseInt($event.target.value)
  }

  private createSearchForm(): FormGroup {
    return this.fb.group({
      q: this.fb.control<string>('', [ Validators.required, Validators.minLength(1) ]),
      limit: this.fb.control<number>(5, [ Validators.min(1), Validators.max(25) ]),
      rating: this.fb.control<string>('pg', [ Validators.required ])
    })
  }



}
