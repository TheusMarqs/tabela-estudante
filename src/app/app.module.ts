import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EstudantesComponent } from './estudantes/estudantes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EstudantesFormComponent } from './estudantes-form/estudantes-form.component';

@NgModule({
  declarations: [
    AppComponent,
    EstudantesComponent,
    EstudantesFormComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
