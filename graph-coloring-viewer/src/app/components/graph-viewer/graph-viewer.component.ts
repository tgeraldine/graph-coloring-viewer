import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { Edge } from "src/app/interfaces/edge";
import { Vertice } from "src/app/interfaces/vertice";

@Component({
    standalone: true,
    selector: 'app-graph-viewer',
    templateUrl: './graph-viewer.component.html',
    styleUrls: ['./graph-viewer.component.scss']
})
class GraphViewerComponent implements AfterViewInit {
    @Input() vertices: Vertice[] = [];
    @Input() edges: Edge[] = [];

    @ViewChild('myCanvas') canvas!: ElementRef<HTMLCanvasElement>;

    public ngAfterViewInit(): void {
        this.drawGraph();
    }

    public drawGraph() {
        const ctx = this.canvas.nativeElement.getContext('2d');

        if (ctx === undefined || ctx === null) return;

        let centerX = this.canvas.nativeElement.width / 2;
        let centerY = this.canvas.nativeElement.height / 2;

        let numPonints = 100;

        let radius = 300;
        const angleIncrement = (2 * Math.PI) / numPonints;

        ctx.fillStyle = 'grey';

        for (let i = 0; i < numPonints; i++) {
            const angle = i * angleIncrement;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);

            ctx.beginPath();
            ctx.arc(x, y, 5, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
}

export { GraphViewerComponent };