import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './components/form.component';
import { provideHttpClient } from '@angular/common/http';
import { DogService } from './dog.service';


//rmb to import RFM and provide httpclient and dogservice

@NgModule({
  declarations: [
    AppComponent,
    FormComponent
  ],
  imports: [
    BrowserModule, ReactiveFormsModule],

    // DEPRECATED
      //BrowserModule, ReactiveFormsModule, HttpClientModule],
      //import HttpClientModule
      //declaring DogService (will be available everywhere)
  providers: [provideHttpClient(), DogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
