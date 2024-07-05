import { Component } from '@angular/core';
import { Vertice } from './interfaces/vertice';
import { Edge } from './interfaces/edge';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public nColors: number = 0;
  public vertices: Vertice[] = [];
  public edges: Edge[] = [];

  public setSeparatorCharacter = '\n\n';
  public elementSeparatorCharacter = '\n';

  handleUpload(event: any) {
    const file: File = event.files[0];

    this.readUploadedFile(file);
  }

  readUploadedFile(file: File) {
    const reader = new FileReader();

    reader.onload = () => {
      const fileContent: any = reader.result;
      this.formatData(fileContent);
    };

    reader.readAsText(file);
  }

  private formatData(text: string): void {
    const textSplit: string[] = text.split(this.setSeparatorCharacter);

    const verticeSet = textSplit[0].split(this.elementSeparatorCharacter);
    const edgeSet = textSplit[1].split(this.elementSeparatorCharacter);

    let newVertices: Vertice[] = [];

    verticeSet.forEach((vertice: string) => {
      const element = vertice.slice(1, vertice.length - 1).split(',');
      newVertices.push({
        index: parseInt(element[0]),
        color: parseInt(element[1]),
      });
    });

    this.vertices = newVertices;

    let newEdges: Edge[] = [];

    edgeSet.forEach((edge: string) => {
      const element = edge.slice(1, edge.length - 1).split(',');
      let index = newEdges.push({
        aVerticeIndex: parseInt(element[0]),
        bVerticeIndex: parseInt(element[1]),
        color: parseInt(element[2]),
      }) - 1;

      if (parseInt(element[2]) >= this.nColors)
        this.nColors = parseInt(element[2]) + 1;
    });

    this.edges = newEdges;
  }
}
