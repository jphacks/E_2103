import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from '../global.service';
import { environment } from 'src/environments/environment';

import { ModalController } from '@ionic/angular';
import { ModalSettingPage } from './modal-setting/modal-setting.page';
import { fill } from '@tensorflow/tfjs-core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.page.html',
  styleUrls: ['./practice.page.scss'],
})
export class PracticePage implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public modalController: ModalController,
    public gs: GlobalService
  ) { }

  @ViewChild('smileCanvas')
  smileCanvas: ElementRef;
  @ViewChild('fillerCanvas')
  fillerCanvas: ElementRef;
  @ViewChild('negativeCanvas')
  negativeCanvas: ElementRef;
  @ViewChild('timeCanvas')
  timeCanvas: ElementRef;

  options: any;
  ctx: any = {};
  lineColor: any = {
    smile: '#4169e1',
    filler: '#ff69b4',
    negative: '#ffa500',
    time: '#98fb98'
  }
  label: any = {
    smile: 'スマイルの回数',
    filler: 'フィラーの回数',
    negative: 'ネガティブの回数',
    time: '発表時間と目標時間の差(秒)'
  }
  ylabel: any = {
    smile: '回数',
    filler: '回数',
    negative: '回数',
    time: '時間(秒)'
  }

  project_id: string
  smile_times: number
  filler_times: number
  negative_times: number
  time_min: number
  time_sec: number
  practice_times: number
  smile_result: number
  filler_result: number
  negative_result: number
  time_result: number
  results: any

  modal_return: any
  status_list: string[] = ["", "", "", ""]

  hint: string = "フィラーは「えーと」「あー」<br> \
                  などのように<ruby>話<rt>はな</rt></ruby>している<ruby>途中<rt>とちゅう</rt></ruby>に<br> \
                  ついつい<ruby>出<rt>で</rt></ruby>てしまう<ruby>言葉<rt>ことば</rt></ruby>です…<br> \
                  これが<ruby>多<rt>おお</rt></ruby>いとうまく<ruby>話<rt>はなし</rt></ruby>が<ruby><br> \
                  伝<rt>つた</rt></ruby>わりません😢"
  hintSmile: string = "カメラを<ruby>起動<rt>きどう</rt></ruby>しないと<br> \
                       <ruby>数<rt>かぞ</rt></ruby>えられませんよ！"

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.project_id = params["project_id"]
        this.gs.httpGet(environment.url+'project/'+this.project_id+'/get_target').subscribe(
          (res) => {
            console.log(res)
            this.smile_times = res["smile_times"]
            this.filler_times = res["filler_times"]
            this.negative_times = res["negative_times"]
            this.time_min = res["time_min"]
            this.time_sec = res["time_sec"]
            this.practice_times = res["project_times"]
            this.smile_result = res["smile_result"]
            this.filler_result = res["filler_result"]
            this.negative_result = res["negative_result"]
            this.time_result = res["time_result"]
            this.results = res["results"]
            this.checkTarget()
            this.drawDashBorad()
          }
        )
      }
    )
  }

  toFeedback = () => {
    this.router.navigate(['/feedback', this.project_id])
  }
  toUserHome = () => {
    this.router.navigate(['home']);
  }

  presentModal = async () => {
    const modal = await this.modalController.create({
      component: ModalSettingPage,
      componentProps: {
        'project_id': this.project_id,
        'smile_times': this.smile_times,
        'filler_times': this.filler_times,
        'negative_times': this.negative_times,
        'time_min': this.time_min,
        'time_sec': this.time_sec
      }
    });
    await modal.present();
    this.modal_return = await modal.onDidDismiss()
    this.smile_times = this.modal_return["data"]["smile_times"]
    this.filler_times = this.modal_return["data"]["filler_times"]
    this.negative_times = this.modal_return["data"]["negative_times"]
    this.time_min = this.modal_return["data"]["time_min"]
    this.time_sec = this.modal_return["data"]["time_sec"]
  }

  checkTarget = () => {
    if (this.smile_result == null) this.status_list[0] = "<ruby>未挑戦<rt>みちょうせん</rt></ruby>…"
    else if (this.smile_result >= this.smile_times) this.status_list[0] = "🎉<ruby>達成<rt>たっせい</rt></ruby>"
    else {
      this.status_list[0] = "あと" + String(this.smile_times - this.smile_result) + "<ruby>回<rt>かい</rt></ruby>!"
    }

    if (this.filler_result == null) this.status_list[1] = "<ruby>未挑戦<rt>みちょうせん</rt></ruby>…"
    else if (this.filler_result < this.filler_times) this.status_list[1] = "🎉<ruby>達成<rt>たっせい</rt></ruby>"
    else {
      this.status_list[1] = "あと" + String(this.filler_result - this.filler_times + 1) + "<ruby>回<rt>かい</rt></ruby>!"
    }

    if (this.negative_result == null) this.status_list[2] = "<ruby>未挑戦<rt>みちょうせん</rt></ruby>…"
    else if (this.negative_result < this.negative_times) this.status_list[2] = "🎉<ruby>達成<rt>たっせい</rt></ruby>"
    else {
      this.status_list[2] = "あと" + String(this.negative_result - this.negative_times + 1) + "<ruby>回<rt>かい</rt></ruby>!"
    }

    if (this.time_result == null) this.status_list[3] = "<ruby>未挑戦<rt>みちょうせん</rt></ruby>…"
    else if (30 >= this.time_result) this.status_list[3] = "🎉<ruby>達成<rt>たっせい</rt></ruby>"
    else {
      this.status_list[3] = "あと" + String(this.time_result - 30) + "<ruby>秒<rt>びょう</rt></ruby>!"
    }
  }

  drawDashBorad = () => {
    this.drawPractices('smile')
    this.drawPractices('filler')
    this.drawPractices('negative')
    this.drawPractices('time')
  }

  drawPractices = (param: string) => {
    /** canvasのリファレンス取得 **/
    if(param == 'smile') {
      const canvas = this.smileCanvas.nativeElement
      var ctx = canvas.getContext('2d');
    }
    else if(param == 'filler') {
      const canvas = this.fillerCanvas.nativeElement
      var ctx = canvas.getContext('2d');}
    else if(param == 'negative') {
      const canvas = this.negativeCanvas.nativeElement
      var ctx = canvas.getContext('2d');
    }
    else if(param == 'time') {
      const canvas = this.timeCanvas.nativeElement
      var ctx = canvas.getContext('2d');
    }

    var labels = []
    for(let i = 0; i < this.results[param].length; i++)
      labels.push(`${i+1}`)

    var options = {
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: '練習回数',
            fontSize: 15
          },
          ticks: {
            maxTicksLimit: 20
          }
        }],
        yAxes: [{
          display: true,
          id: "y-axis",
          type: "linear", 
          position: "left",
          scaleLabel: {
            display: true,
            labelString: this.ylabel[param],
            fontSize: 15
          },
          ticks: {
            fontColor: '#ff66666',
            maxTicksLimit: 7
          }
        }],
      },
      legend: {
        display: false
      }
    }
    new Chart(ctx, {
      data: {
        labels: labels,
        datasets: [
          {
            type: 'line',
            label: this.label[param],
            data: this.results[param],
            borderColor: this.lineColor[param],
            backgroundColor: "rgba(0,0,0,0)",
            yAxisID: 'y-axis'
          }
        ],
      },
      options: options
    })
  }

  toArticle = () => {
    this.router.navigate(['/article', this.project_id])
  }
}
