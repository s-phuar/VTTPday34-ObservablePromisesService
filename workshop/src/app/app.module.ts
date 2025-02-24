import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { giphyService } from './giphy.service';
import { FormComponent } from './components/form.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent
  ],
  imports: [
    BrowserModule, ReactiveFormsModule
  ],
      // DEPRECATED
      //BrowserModule, ReactiveFormsModule, HttpClientModule],
      //import HttpClientModule
      //declaring giphyService (will be available everywhere)
  providers: [provideHttpClient(), giphyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
