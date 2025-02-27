import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { GiphyService } from '../giphy.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-image',
  standalone: false,
  templateUrl: './image.component.html',
  styleUrl: './image.component.css'
})
export class ImageComponent implements OnInit, OnDestroy{

  private giphySvc = inject(GiphyService)

  //subscribe to observable of string [], searchResults from giphyservice
  private sub!: Subscription
  images: string[] = []

  //listens for observable 'searchResults' from giphy service
  ngOnInit(): void {
    this.sub = this.giphySvc.searchResults.subscribe({
      next:(images) =>this.images = images
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

}
