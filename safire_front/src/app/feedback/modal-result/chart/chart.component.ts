import { Component, OnInit, Input } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js'; // データ型をimport
import { Color, Label } from 'ng2-charts'; // ng2-chartsのプロパティのデータ型をimport
import { throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  @Input() sequence: number[]
  @Input() label: string
  @Input() color: string

  x_axis: Label[] = []

  // data
  lineChartData: ChartDataSets[] = [
    {
      data: [100, 60, 90, 0, 80, 50, 60],
      label: 'ストレスレベル',
    },
  ];
  // ラベル
  lineChartLabels: Label[] = [
    '6日前',
    '5日前',
    '4日前',
    '3日前',
    '一昨日',
    '昨日',
    '今日'
  ];
  lineChartOptions: ChartOptions = {
    // responsive: true,
    // scales: {
    //   y: {
    //     min: 0,
    //     max: 100,
    //   }
    // }
  };
  // 色
  lineChartColors: Color[] = [
    {
      borderColor: '#F06292',
      backgroundColor: 'rgba(240,192,208,0.28)',
    },
  ];
  lineChartLegend = true; // グラフの属性ラベル
  lineChartPlugins = [];
  lineChartType = 'line'; // グラフの種類

  constructor() { }

  ngOnInit() {
    // console.log(this.sequence)
    // console.log(this.label)
    // console.log(this.color)
    this.lineChartData[0]["label"] = this.label;
    this.lineChartColors[0]["borderColor"] = this.color
    this.lineChartColors[0]["backgroundColor"] = this.color + '4D'
    // this.lineChartOptions["scales"]["y"]["max"] = Math.max(...this.sequence) * 1.1
    // 横軸の作成
    for (let i = 1; i <= this.sequence.length; i++) {
      this.x_axis.push(String(i * 5) + '秒')
    }
    this.lineChartData[0]["label"]
    this.lineChartLabels = this.x_axis
    this.lineChartData[0]["data"] = this.sequence
    // this.lineChartData[0]["data"] = stressDataList;
  }

}
