import { Component, inject, Input, Output } from '@angular/core';
import { giphyService } from './giphy.service';
import { QueryParams } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {

  //@Autowired giphy service
  private giphyService = inject(giphyService)

  @Input()
  giphyURLS: string[] = []
  

  //dont need subscribe since we are using promise

  //receives promise and push data to view
  processQuery($event: QueryParams){
    console.info('.....processing')
    this.giphyService.searchGIF($event)
    .then (result => { //result should be the entire inital object
      console.info('>>> DATA received: ', result)
      result.data.forEach((gif) => { //for each referring to each json obj(gif) inside the data jsonarray
        const fixedHeightUrl = gif?.images?.fixed_height?.url
        this.giphyURLS.push(fixedHeightUrl)
        console.info('urls: ', this.giphyURLS)
      })
    })
    .catch(err =>{
      console.info('>>> ERROR: ', err)
    })
  }



}
