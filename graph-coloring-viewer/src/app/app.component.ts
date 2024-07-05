import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  

  handleUpload(event: any) {
    const file: File = event.files[0];

    this.readUploadedFile(file);
  }

  readUploadedFile(file: File) {
    const reader = new FileReader();

    reader.onload = () => {
      const fileContent: any = reader.result;
      console.log('Conteúdo do arquivo:', fileContent);
    };

    reader.readAsText(file);
  }
  
}
