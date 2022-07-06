import { Component, OnInit } from '@angular/core';
import { ArcElement, BarController, BarElement, BubbleController, CategoryScale, Chart, Decimation, DoughnutController, Filler, Legend, LinearScale, LineController, LineElement, LogarithmicScale, PieController, PointElement, PolarAreaController, RadarController, RadialLinearScale, ScatterController, SubTitle, TimeScale, TimeSeriesScale, Title, Tooltip } from 'chart.js';

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
        locale: 'pt-BR'
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
        locale: 'pt-BR'
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
        locale: 'pt-BR'
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
  }
}

