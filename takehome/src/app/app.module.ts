import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { GiphyService } from './giphy.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './components/form.component';
import { ImageComponent } from './components/image.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    ImageComponent
  ],
  imports: [
    BrowserModule, ReactiveFormsModule
  ],
  providers: [provideHttpClient(), GiphyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
