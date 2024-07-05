import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Edge } from 'src/app/interfaces/edge';
import { Vertice } from 'src/app/interfaces/vertice';

@Component({
  standalone: true,
  selector: 'app-graph-viewer',
  templateUrl: './graph-viewer.component.html',
  styleUrls: ['./graph-viewer.component.scss'],
})
class GraphViewerComponent implements AfterViewInit, OnChanges {
  @Input() nColors: number = 0;
  @Input() vertices: Vertice[] = [];
  @Input() edges: Edge[] = [];

  @ViewChild('myCanvas') canvas!: ElementRef<HTMLCanvasElement>;

  private colors: string[] = [];

  public ngAfterViewInit(): void {
    if (this.vertices.length !== 0) this.drawGraph();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.canvas !== undefined) this.drawGraph();
  }

  public drawGraph() {
    const ctx = this.canvas.nativeElement.getContext('2d');

    if (ctx === undefined || ctx === null) return;

    this.setColors(this.nColors);

    let centerX = this.canvas.nativeElement.width / 2;
    let centerY = this.canvas.nativeElement.height / 2;

    let numPonints = this.vertices.length;

    let radius = 200;
    const angleIncrement = (2 * Math.PI) / numPonints;

    this.edges.forEach((edge: Edge) => {
      let angle;
      const v1 = this.vertices[edge.aVerticeIndex];
      const v2 = this.vertices[edge.bVerticeIndex];

      angle = v1.index * angleIncrement;
      const startX = centerX + radius * Math.cos(angle);
      const startY = centerY + radius * Math.sin(angle);

      angle = v2.index * angleIncrement;
      const endX = centerX + radius * Math.cos(angle);
      const endY = centerY + radius * Math.sin(angle);

      ctx.strokeStyle = this.colors[edge.color];

      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      ctx.closePath();
    });

    this.vertices.forEach((vertice: Vertice) => {
      const angle = vertice.index * angleIncrement;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      ctx.fillStyle = this.colors[vertice.color];

      ctx.beginPath();
      ctx.arc(x, y, 10, 0, 2 * Math.PI);
      ctx.fill();
    });
  }

  private setColors(n: number): void {
    this.colors = [];

    const increment = (255 * 3) / n;

    for (let i = 0; i < n; i++) {
      let value = i * Math.floor(increment);

      if (value > 255 * 2) {
        let color = value % (255 * 2);
        this.colors.push(`rgb(0, ${255 - color}, ${color})`);
      } else if (value > 255 * 1 && value <= 255 * 2) {
        let color = value % (255 * 1);
        this.colors.push(`rgb(${255 - color}, ${color}, 0)`);
      } else {
        this.colors.push(`rgb(${value}, 0, 0)`);
      }
    }

    console.log(this.colors);
  }
}

export { GraphViewerComponent };
