import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AddformNoteComponent } from './ui/addform-note/addform-note.component';
import { CardNoteComponent } from './ui/card-note/card-note.component';

@NgModule({
  declarations: [
    AppComponent,
    AddformNoteComponent,
    CardNoteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
