import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { Edge } from "src/app/interfaces/edge";
import { Vertice } from "src/app/interfaces/vertice";

@Component({
    standalone: true,
    selector: 'app-graph-viewer',
    templateUrl: './graph-viewer.component.html',
    styleUrls: ['./graph-viewer.component.scss']
})
class GraphViewerComponent implements AfterViewInit, OnChanges {
    ngOnChanges(changes: SimpleChanges): void {
        if (this.canvas !== undefined) this.drawGraph();
    }
    @Input() vertices: Vertice[] = [];
    @Input() edges: Edge[] = [];

    @ViewChild('myCanvas') canvas!: ElementRef<HTMLCanvasElement>;

    public ngAfterViewInit(): void {
        if (this.vertices.length !== 0) this.drawGraph();
    }

    public drawGraph() {
        const ctx = this.canvas.nativeElement.getContext('2d');

        if (ctx === undefined || ctx === null) return;

        let centerX = this.canvas.nativeElement.width / 2;
        let centerY = this.canvas.nativeElement.height / 2;

        let numPonints = this.vertices.length;

        let radius = 100;
        const angleIncrement = (2 * Math.PI) / numPonints;

        ctx.fillStyle = 'grey';
    
        this.edges.forEach((edge: any) => {
            let angle;
            const v1 = this.vertices[edge[0]];
            const v2 = this.vertices[edge[1]];

                angle
            const startX = centerX + radius * Math.cos(angle);
            const startY = centerY + radius * Math.sin(angle);

            var startX = v1.index;
            var startY = v1.index;
            var endX = v2[0];
            var endY = v2[1];

            ctx.beginPath();
            ctx.moveTo(startX, startY); // Move para o ponto inicial
            ctx.lineTo(endX, endY);     // Desenha uma linha até o ponto final
            ctx.strokeStyle = 'black'; // Define a cor da linha (vermelho)
            ctx.lineWidth = 2;          // Define a largura da linha
            ctx.stroke();               // Renderiza a linha

            // Fecha o caminho (path)
            ctx.closePath();
        });

        this.vertices.forEach((vertice: Vertice) => {
            const angle = vertice.index * angleIncrement;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);

            ctx.beginPath();
            ctx.arc(x, y, 10, 0, 2 * Math.PI);
            ctx.fill();
        });
    }
}

export { GraphViewerComponent };