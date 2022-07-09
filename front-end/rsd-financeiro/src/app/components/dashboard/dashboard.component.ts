import { Component, OnInit } from '@angular/core';
import { ArcElement, BarController, BarElement, BubbleController, CategoryScale, Chart, Decimation, DoughnutController, Filler, Legend, LinearScale, LineController, LineElement, LogarithmicScale, PieController, PointElement, PolarAreaController, RadarController, RadialLinearScale, ScatterController, SubTitle, TimeScale, TimeSeriesScale, Title, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { jsPDF } from 'jspdf';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  timerGraficos!: any;
  g1!: Chart;
  g2!: Chart;
  g3!: Chart;
  g4!: Chart;

  constructor() {
    Chart.register(ArcElement,
      LineElement,
      BarElement,
      PointElement,
      BarController,
      BubbleController,
      ChartDataLabels,
      DoughnutController,
      LineController,
      PieController,
      PolarAreaController,
      RadarController,
      ScatterController,
      CategoryScale,
      LinearScale,
      LogarithmicScale,
      RadialLinearScale,
      TimeScale,
      TimeSeriesScale,
      Decimation,
      Filler,
      Legend,
      Title,
      Tooltip,
      SubTitle);

    // this.timerGraficos = setInterval(() => {
    //   this.g1.data.datasets[0].data = [Math.random(), Math.random(), Math.random()];
    //   this.g2.data.datasets[0].data = [Math.random(), Math.random(), Math.random()];
    //   this.g3.data.datasets[0].data = [Math.random(), Math.random(), Math.random()];
    //   this.g4.data.datasets[0].data = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random()];
    //   this.g4.data.datasets[1].data = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random()];
    //   this.g1.update();
    //   this.g2.update();
    //   this.g3.update();
    //   this.g4.update();
    // }, 10000);
  }

  ngOnInit(): void {
    var graficoReceitas = document.getElementById("graficoReceitas") as HTMLCanvasElement;
    var graficoDespesas = document.getElementById("graficoDespesas") as HTMLCanvasElement;
    var graficoResultado = document.getElementById("graficoResultado") as HTMLCanvasElement;
    var graficoResultado12Meses = document.getElementById("graficoResultado12Meses") as HTMLCanvasElement;

    this.g1 = new Chart(graficoReceitas, {
      type: 'pie',
      options: {
        locale: 'pt-BR',
        plugins: {
          title: {
            text: 'Receitas',
            display: true
          },
        },
      },
      data: {
        labels: ['Vendas', 'Serviços', 'Financeiro'],
        datasets: [
          {
            label: 'test',
            data: [
              60000.00, 30000.00, 10000.00
            ],
            backgroundColor: ['rgba(16, 164, 24, 0.6)',
              'rgba(46, 204, 64, 0.6)',
              'rgba(176, 244, 104, 0.6)']
          }
        ]
      }
    });
    this.g2 = new Chart(graficoDespesas, {
      type: 'pie',
      options: {
        locale: 'pt-BR',
        plugins: {
          title: {
            text: 'Despesas e Custos',
            display: true
          },
        },
      },
      data: {
        labels: ['Fixas', 'Variáveis', 'Custos'],
        datasets: [
          {
            label: 'test',
            data: [
              5000, 10000, 5000
            ],
            backgroundColor: ['rgba(255, 81, 64, 0.6)',
              'rgba(255, 116, 64, 0.6)',
              'rgba(255, 161, 64, 0.6)']
          }
        ]
      }
    });
    this.g3 = new Chart(graficoResultado, {
      type: 'line',
      options: {
        locale: 'pt-BR',
        plugins: {
          title: {
            text: 'Resultado',
            display: true
          },
        },
      },
      data: {
        labels: ['Abril', 'Maio', 'Junho'],
        datasets: [
          {
            label: 'Evolução',
            data: [
              75000, 60000, 80000
            ],
            backgroundColor: ['rgba(0, 116, 217, 0.6)',
              'rgba(46, 204, 64, 0.6)',
              'rgba(255, 65, 54, 0.6)']
          }
        ]
      }
    });
    this.g4 = new Chart(graficoResultado12Meses, {
      type: 'line',
      options: {
        locale: 'pt-BR'
      },
      data: {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
        datasets: [
          {
            label: 'Receita',
            type: 'bar',
            data: [
              160000, 130000, 10000, 175000, 160000, 100000
            ],
            backgroundColor: ['rgba(0, 116, 217, 0.6)'],
            borderColor: ['rgb(0, 116, 217)'],
            borderWidth: 1
          },
          {
            label: 'Lucro/Prejuízo',
            type: 'bar',
            data: [
              60000, 30000, -10000, 75000, 60000, 80000
            ],
            backgroundColor: ['rgba(46, 204, 64, 0.6)'],
            borderColor: ['rgb(46, 204, 64)'],
            borderWidth: 1
          }
        ]
      }
    });
  }

  ngOnDestroy(): void {
    // clearInterval(this.timerGraficos);
    this.g1.destroy();
    this.g2.destroy();
    this.g3.destroy();
    this.g4.destroy();
  }

  private linhasGuias(doc: jsPDF) {
    return;
    let fontSize = doc.getFontSize();
    let textColor = doc.getTextColor();
    let drawColor = doc.getDrawColor();
    // Desenha guias para posicionar os elementos
    doc.setDrawColor('red');
    doc.setLineWidth(0.05);
    doc.setTextColor('red');
    doc.setFontSize(7);
    for (let i = 0; i < 297; i += 10) {
      doc.line(0, i, 210, i);
      doc.line(i, 0, i, 297);
      doc.text(`${i}`, 1, i - 1);
    }
    doc.setDrawColor(drawColor);
    doc.setTextColor(textColor);
    doc.setFontSize(fontSize);
  }

  imprimir() {    
    let graficoRatio = 1 / 5.3;
    let offsetx = 0;
    let offsety = 0;
    let baseline = 0;

    var doc = new jsPDF('p', 'mm', [210, 297]);
    doc.setFont('Helvetica');
    this.linhasGuias(doc); // linhas guias para auxiliar na construção do PDF

    doc.setDrawColor('black');
    doc.setTextColor('black');
    doc.setFontSize(24);
    doc.text('Resultados - Junho/2022', 5, 12);
    doc.line(5, 14, 205, 14);

    offsety = 20;
    doc.addImage(this.g1.toBase64Image('image/png', 1.0), 'PNG', 5 + offsetx, baseline + offsety, this.g1.width * graficoRatio, this.g1.height * graficoRatio);
    // doc.rect(15, 40, (this.g1.width * graficoRatio), (this.g1.height * graficoRatio));
    offsetx = (this.g1.width * graficoRatio);

    doc.addImage(this.g2.toBase64Image('image/png', 1.0), 'PNG', 5 + offsetx, baseline + offsety, this.g2.width * graficoRatio, this.g2.height * graficoRatio);
    offsetx += (this.g1.width * graficoRatio);

    doc.addImage(this.g3.toBase64Image('image/png', 1.0), 'PNG', 5 + offsetx, baseline + offsety, this.g3.width * graficoRatio, this.g3.height * graficoRatio);

    offsetx = 0;
    offsety = 70;
    graficoRatio = 1 / 5.8;
    doc.addImage(this.g4.toBase64Image('image/png', 1.0), 'PNG', 5 + offsetx, baseline + offsety, this.g4.width * graficoRatio, this.g4.height * graficoRatio);

    doc.addPage('p');
    this.linhasGuias(doc);
    doc.setFontSize(24);
    doc.text('Resultados - Junho/2022', 5, 12);
    doc.line(5, 14, 205, 14);
    // offsety = 120;
    offsety = 25;

    doc.setFontSize(14);
    doc.setFont('Helvetica', 'bold');
    doc.text('Notas Explicativas', 10, baseline + offsety);

    // offsety = 125;
    offsety = 30;
    doc.setFontSize(10);
    doc.setFont('Helvetica', 'normal');
    doc.text('Notas Explicativas Notas Explicativas Notas Explicativas Notas Explicativas Notas Explicativas Notas Explicativas \nNotas Explicativas Notas Explicativas Notas Explicativas Notas Explicativas Notas Explicativas Notas Explicativas \nNotas Explicativas Notas Explicativas Notas Explicativas Notas Explicativas Notas Explicativas Notas Explicativas', 10, baseline + offsety);

    offsety = 20;
    doc.rect(5, baseline + offsety, 200, 20);

    QRCode.toDataURL('https://github.com/rsd-consultorias/', (err, data) => {
      doc.addImage(data, 'image/jpg', 160, 247, 50, 50);
    });

    doc.save('dashboard.pdf');
  }
}