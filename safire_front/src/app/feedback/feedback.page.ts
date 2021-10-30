import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GlobalService } from '../global.service';
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import axios from 'axios';
import Cookie from 'universal-cookie';

import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import marked from 'marked';

import * as faceapi from 'face-api.js';

import { ModalController } from '@ionic/angular';
import { ModalResultPage } from './modal-result/modal-result.page';

import { environment } from 'src/environments/environment';

declare global {
  interface MediaDevices {
    getDisplayMedia(constraints?: MediaStreamConstraints): Promise<MediaStream>;
  }
}

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit, OnDestroy {

  text: string = "しゃべった内容をここで確認！"
  status: string = "しゃべった内容をここで確認！"

  speechFlag: boolean = true

  return: any = {}

  video: HTMLVideoElement
  video_flag: boolean = false
  video_text: string = "カメラ起動"
  stream: any
  combine_stream: any
  video_button_fill: string = "solid"
  recorder: any
  download_link: HTMLAnchorElement

  start_interval: any
  start_time: number
  start_waiting: any

  timer_id: any
  timer_last: any
  timer_start: any
  timer_between: any
  timer: string = "00:00"
  char_per_sec: string
  speed_list: number[] = []
  speed_mean: number = 0

  filler_times: number = 0
  negative_times: number = 0
  smile_times: number = 0
  smile_interval: any

  m: number = 0
  s: number = 0

  project_id: number

  // 5秒ごとに格納
  smile_sequence: number[] = []
  filler_sequence: number[] = []
  negative_sequence: number[] = []
  speed_sequence: number[] = []
  sequence_id: any

  top_button_list: any[] = [
    {
      name: "入力内容表示",
      fill: "outline",
      flag: true,
      list: []
    },{
      name: "要約内容表示",
      fill: "solid",
      flag: false,
      list: []
    },{
      name: "補足内容表示",
      fill: "solid",
      flag: false,
      list: []
    }
  ]

  blob: Blob

  constructor(
    private router: Router,
    public gs: GlobalService,
    private route: ActivatedRoute,
    private alertController: AlertController,
    public loadingController: LoadingController,
    public modalController: ModalController,
  ) { }

  ngOnInit() {
    // this.getTokenOrRefresh()
    this.route.params.subscribe(
      params => {
        this.project_id = params["project_id"]
        this.gs.httpGet("https://techfusion-studio.com/safire/presentation/" + this.project_id).subscribe(
          res => {
            this.return = res
            console.log(res)
            this.setList(res)
          }
        )
      }
    )
  }
  ngOnDestroy() {
    if (this.video_flag) {
      this.stream.getTracks().forEach(track => track.stop())  // 遷移時のカメラ停止
    }
  }

  setList = (res) => {
    this.top_button_list[0]["list"].push(res["title"])
    this.top_button_list[0]["list"].push(res["description_background"].split("。").join("。<br>"))
    this.top_button_list[0]["list"].push(res["description_idea"].split("。").join("。<br>"))
    this.top_button_list[0]["list"].push(res["description_technology"].split("。").join("。<br>"))
    this.top_button_list[1]["list"].push(res["title"] + "<br>")
    this.top_button_list[1]["list"].push(res["abstract_list"][0].join("<br>"))
    this.top_button_list[1]["list"].push(res["abstract_list"][1].join("<br>"))
    this.top_button_list[1]["list"].push(res["abstract_list"][2].join("<br>"))
    this.top_button_list[2]["list"].push(marked(res["appendix"]).replace('\n', '<br>'))
  }

  clickTopButton = (index) => {
    this.top_button_list.forEach(
      (button, i) => {
        if (index == i) {
          button["fill"] = "outline"
          button["flag"] = true
        }
        else {
          button["fill"] = "solid"
          button["flag"] = false
        }
      }
    )
  }

  startSpeech = () => {
    this.text = ""
    this.smile_sequence = []
    this.filler_sequence = []
    this.negative_sequence= []
    this.speed_sequence = []
    this.speechFlag = true
    this.sttFromMic()
    this.startRecording()
  }
  stopSpeech = () => {
    this.speechFlag = false
  }

  countFiller = () => {
    console.log(this.text)
  }

  async sttFromMic() {
    const tokenObj = await this.getTokenOrRefresh();
    const speechConfig = sdk.SpeechConfig.fromAuthorizationToken(tokenObj.authToken, tokenObj.region);
    speechConfig.speechRecognitionLanguage = 'ja-JP';
    
    const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

    this.status = "speak into your microphone..."

    recognizer.recognizeOnceAsync(result => {
      this.setText(result)
    });
  }

  setText = (result) => {
    if (result.reason === sdk.ResultReason.RecognizedSpeech) {
      const speed = (result.text.length / ((Date.now() - this.timer_last) / 1000))
      this.char_per_sec =  speed.toFixed(1)
      this.speedManagement(speed)
      this.text = this.text + `[${this.timer} ${this.char_per_sec}char/sec] `
      this.checkFiller(String(result.text))  // filler検知を行う場合
      // this.checkNegative(String(result.text))  // filler検知を飛ばす場合
      // this.text = this.text + `[${this.timer} ${this.char_per_sec}char/sec] ${result.text}<br>`  // 何も行わない場合
    }
    if (this.speechFlag == true) {
      this.sttFromMic()
    }
    else {
      this.text = this.text + "[END]"
      this.stopRecording()
    }
  }
  speedManagement = (speed) => {
    this.speed_list.push(speed)
    this.speed_mean = this.speed_list.reduce((previous, current) => previous + current) / this.speed_list.length
  }
  checkFiller = (text) => {
    const body = { text: text.split("。")[0] }
    this.gs.http(environment.filler+"model/parse", body).subscribe(
      res => {
        console.log(res)
        this.filler_times += res["entities"].length
        if (res["entities"].length == 0) this.text = this.text + `${text.split("。")[0]}。`
        else this.text = this.text + `${text.split("。")[0]}。(F)`

        if (text.split("。").length == 1 || text.split("。")[1] == "") this.checkNegative(this.text.split("char/sec]").slice(-1)[0])
        else this.checkFiller(text.split("。").slice(1).join("。"))
      }
    )
  }
  checkNegative = (text) => {
    const body = {
      "documents": [
        {
          "id": `${String(Math.floor(Math.random() * 1000000000))}`,
          "text": text,
          "language": "ja"
        }
      ]
    }
    this.gs.httpNegative("https://safire.cognitiveservices.azure.com/text/analytics/v3.2-preview.1/sentiment", body).subscribe(
      res => {
        this.text = this.text.split("char/sec]").slice(0, -1).join("char/sec]") + "char/sec]"
        console.log(this.text)
        res["documents"][0]["sentences"].forEach(
          sentence => {
            if (sentence.sentiment == "negative") {
              this.negative_times += 1
              this.text = this.text + `${sentence.text}(N)`
            }
            else this.text = this.text + `${sentence.text}`
          }
        )
        this.text = this.text + "<br>"
      }
    )
  }

  async getTokenOrRefresh() {
    const cookie = new Cookie();
    const speechToken = cookie.get('speech-token');
    const region = "japaneast"
    const headers = {
      headers: {
        'Ocp-Apim-Subscription-Key': "c57b312ee02e46e4ba8ac7bd8e9920c8",
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
      
    if (speechToken === undefined ) {
      try {
        const tokenResponse = await axios.post(`https://japaneast.api.cognitive.microsoft.com/sts/v1.0/issueToken`, null, headers);
        const token = tokenResponse.data
        cookie.set('speech-token', region + ':' + token, {maxAge: 540, path: '/'});

        console.log('Token fetched from back-end: ' + token);
        return { authToken: token, region: region };
      } catch (err) {
        console.log(err);
        return { authToken: null, error: err };
      }
      } else {
        console.log('Token fetched from cookie: ' + speechToken);
        const idx = speechToken.indexOf(':');
        return { authToken: speechToken.slice(idx + 1), region: speechToken.slice(0, idx) };
      }
  }

  changeCamera = () => {
    this.video = document.querySelector("#camera")
    if (this.video_flag) {
      // カメラを<video>と同期
      this.stream.getTracks().forEach(track => track.stop())
      this.video_flag = !this.video_flag
      this.video_text = "カメラ起動"
      this.video_button_fill = "solid"
    }
    else {
      /** カメラ設定 */
      const constraints = {
        audio: false,
        video: {
          width: 300,
          height: 200,
          // facingMode: "user"   // フロントカメラを利用する
          // facingMode: { exact: "environment" }  // リアカメラを利用する場合
        }
      }

      // カメラを<video>と同期
      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        this.video.srcObject = stream
        this.stream = stream
        this.video.onloadedmetadata = (e) => {
          this.video.play()
          this.video_flag = !this.video_flag
          this.video_text = "カメラ停止"
          this.video_button_fill = "outline"
        };
      })
      .catch( (err) => console.log(err.name + ": " + err.message) );
    }
  }

  startFaceRead = async () => {
    // モデルの読み込み
    await faceapi.nets.tinyFaceDetector.load("assets/models/");
    await faceapi.nets.faceExpressionNet.load("assets/models/");

    this.smile_interval = setInterval(async () => {
      // 顔の表情の分類
      const detectionsWithExpressions = await faceapi.detectAllFaces(this.video,new faceapi.TinyFaceDetectorOptions()).withFaceExpressions()

      // 結果の出力
      console.log(detectionsWithExpressions);
      if (detectionsWithExpressions.length !== 0) {
        detectionsWithExpressions.forEach(
          face => {
            if (face["expressions"]["happy"] > 0.5) this.smile_times += 1
          }
        )
      }
    }, 3000)
  }

  startPractice = () => {
    navigator.mediaDevices.getUserMedia({audio: true, video: true})
    navigator.permissions.query({name: 'microphone'})
    .then((result) => {
      // なんらかの処理。
      if (result.state !== "granted") this.alertPermission()
      else {
        this.alertWay()
      }
    });
  }
  async alertPermission() {
    const alert = await this.alertController.create({
      message: 'マイクの利用が許可されていません.<br>ブラウザの設定をお願いいたします☺️',
      buttons: [ { text: 'OK' } ]
    });
    await alert.present();
  }
  async alertWay() {
    const alert = await this.alertController.create({
      message: '録画する画面を選択して `共有` を押すとカウントダウンの後にプレゼン練習の録画が始まります!<br>頑張ってください👍',
      buttons: [
        { text: 'OK',
          handler: () => {
            this.setupRecording()
          }
        },
      ],
    });
    await alert.present();
  }
  async setupRecording () {
    const videoStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: false
    });
    const audioStream = await navigator.mediaDevices.getUserMedia({
      video: false,
      audio: true
    });
    this.combine_stream = new MediaStream([...videoStream.getTracks(), ...audioStream.getTracks()])
    this.recorder = new MediaRecorder(this.combine_stream, { mimeType: 'video/webm;codecs=h264' })
    // this.recorder = new MediaRecorder(this.stream, { mimeType: "video/webm;codecs=vp9" });
    this.start_time = 3
    this.start_waiting = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: `${this.start_time}秒後に発表練習の録画をスタートします...`,
      duration: 10000
    });
    await this.start_waiting.present();
    this.start_interval = setInterval(() => {
      this.start_time -= 1
      this.start_waiting.message = `${this.start_time}秒後に発表練習の録画をスタートします...`
      if (this.start_time == 0) {
        this.start_waiting.dismiss()
        clearInterval(this.start_interval)
        this.startSpeech()
      }
    }, 1000)
  }
  async startRecording () {
    this.smile_times = 0
    if (this.video_flag) this.startFaceRead()
    this.filler_times = 0
    this.negative_times = 0
    console.log("start recording")
    this.startTimer()
    this.recorder.start();
    
    this.download_link = document.createElement('a');
    this.recorder.ondataavailable = e => {
      console.log("ondataavailable", e);
      this.blob = new Blob([e.data], { type: e.data.type });
      this.openResult()
      // const blob = new Blob([e.data], { type: e.data.type });
      // const blobUrl = URL.createObjectURL(blob);
      // this.download_link.download = "movie.webm";
      // this.download_link.href = blobUrl;
      // this.download_link.style.display = "block";
      // this.download_link.click();  // Direct auto download
    };
  }
  stopRecording = () => {
    this.recorder.stop()
    this.combine_stream.getTracks().forEach(track => track.stop())
    this.stopTimer()
    if (this.video_flag) clearInterval(this.smile_interval)
  }

  /* タイマー */
  startTimer = () => {
    this.timer_start = Date.now()
    this.timer_last = this.timer_start
    this.countUp()
    this.checkSequence()
  }
  countUp = () => {
    this.timer_id = setTimeout(() => {
        this.timer_between = Date.now() - this.timer_start
        if (this.m >= 10) {
          this.speechFlag = false
          this.stopTimer()
          this.alertLimit()
        }
        else {
          this.updateTimer()
          this.countUp();
        }
    },200);
  }
  checkSequence = () => {
    this.sequence_id = setTimeout(() => {
      this.checkSequence()
      this.smile_sequence.push(this.smile_times)
      this.filler_sequence.push(this.filler_times)
      this.negative_sequence.push(this.negative_times)
      this.speed_sequence.push(this.speed_mean)
    }, 5000)
  }
  updateTimer = () => {
    this.m = Math.floor(this.timer_between / 60000);
    this.s = Math.floor(this.timer_between % 60000 / 1000);
    //let ms = this.timer_between % 1000;
    let minute = ('0' + this.m).slice(-2);
    let second = ('0' + this.s).slice(-2);
    //let millisecond = ('0' + ms).slice(-3);

    this.timer = minute + ':' + second
  }
  stopTimer = () => {
    clearTimeout(this.timer_id)
    clearTimeout(this.sequence_id)
  }
  alertLimit = async () => {
    const alert = await this.alertController.create({
      message: '連続発表練習時間の10分に到達しました☺️',
      buttons: [ { text: 'OK' } ]
    });
    await alert.present();
  }
  
  toDashboard = () => {
    this.router.navigate(['/practice', this.project_id])
    this.top_button_list[0]["list"] = []
    this.top_button_list[1]["list"] = []
    this.top_button_list[2]["list"] = []
  }
  openResult = async () => {
    // 最終値の打ち込み
    this.smile_sequence.push(this.smile_times)
    this.filler_sequence.push(this.filler_times)
    this.negative_sequence.push(this.negative_times)
    this.speed_sequence.push(this.speed_mean)

    // modal展開
    const modal = await this.modalController.create({
      component: ModalResultPage,
      componentProps: {
        'blob': this.blob,
        'smile_sequence': this.smile_sequence,
        'filler_sequence': this.filler_sequence,
        'negative_sequence': this.negative_sequence,
        'speed_sequence': this.speed_sequence,
        'smile_result': this.smile_times,
        'filler_result': this.filler_times,
        'negative_result': this.negative_times,
        'time_result': this.timer_between,
        'project_id': this.project_id
      }
    });
    await modal.present();
    // this.modal_return = await modal.onDidDismiss()
    // this.smile_times = this.modal_return["data"]["smile_times"]
  }
}
