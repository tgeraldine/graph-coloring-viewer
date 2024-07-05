import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileUploadModule } from 'primeng/fileupload';

import { AppComponent } from './app.component';
import { GraphViewerComponent } from './components/graph-viewer/graph-viewer.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FileUploadModule,
    GraphViewerComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
