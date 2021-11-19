import { Component, OnInit, Input } from '@angular/core';

interface CanvasElement extends HTMLCanvasElement {
  captureStream(frameRequestRate?: number): MediaStream
}
interface VideoElement extends HTMLVideoElement {
  requestPictureInPicture: () => any
  onenterpictureinpicture: (this: HTMLVideoElement, ev: Event) => any
  onleavepictureinpicture: (this: HTMLVideoElement, ev: Event) => any
  onloadedmetadata: (this: GlobalEventHandlers, ev: Event) => any
}
declare global {
  interface Document {
    exitPictureInPicture()
  }
}

@Component({
  selector: 'app-pip-timer',
  templateUrl: './pip-timer.component.html',
  styleUrls: ['./pip-timer.component.scss'],
})
export class PipTimerComponent implements OnInit {
  @Input() timer: string

  canvasPip: CanvasElement
  ctxPip: CanvasRenderingContext2D
  width: number = 400
  height: number = 140
  fontSize: number = 120

  streamPip: MediaStream
  videoPip: VideoElement

  interval: any
  intervalFlag: Boolean = true

  constructor() { }

  ngOnInit() {
    this.initializeCanvas()
  }

  setInterval = () => {
    this.updateCanvas()
    if (this.intervalFlag){
      this.interval = setTimeout(() => {
        this.setInterval()
      }, 300)
    }
  }

  initializeCanvas = () => {
    this.canvasPip = <CanvasElement> document.createElement('canvas')
    this.ctxPip = this.canvasPip.getContext('2d')
    this.canvasPip.width = this.width
    this.canvasPip.height = this.height
  }

  updateCanvas = async () => {
    this.ctxPip.clearRect(0, 0, this.width, this.height)
    this.ctxPip.fillStyle = 'white'
    this.ctxPip.textAlign = 'center'
    this.ctxPip.font = `bold ${this.fontSize}px 'Times New Roman'`;
    this.ctxPip.fillText(this.timer, this.width / 2, this.height * 0.8)
  }

  makePip = async () => {
    this.intervalFlag = true
    this.setInterval()

    this.streamPip = this.canvasPip.captureStream(10)
    this.videoPip = <VideoElement> document.createElement('video')
    this.videoPip.autoplay = true
    this.videoPip.muted = true
    this.videoPip.playsInline = true
    this.videoPip.width = this.width * 0.2
    this.videoPip.height = this.height * 0.2
    
    this.videoPip.srcObject = this.streamPip
    this.videoPip.onloadedmetadata = (e) => {
      this.videoPip.play()
      this.videoPip.requestPictureInPicture()
      this.videoPip.onenterpictureinpicture = () => {
        // this.video.style.display = 'none';
      }
    
      this.videoPip.onleavepictureinpicture = () => {
        this.videoPip.remove();
      }
    }
  }

  // 削除系の処理 消去とリリース
  stopPip = async () => {
    this.intervalFlag = false
    document.exitPictureInPicture()
  }
}
