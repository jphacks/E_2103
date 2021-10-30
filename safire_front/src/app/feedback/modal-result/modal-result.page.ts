import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GlobalService } from 'src/app/global.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modal-result',
  templateUrl: './modal-result.page.html',
  styleUrls: ['./modal-result.page.scss'],
})
export class ModalResultPage implements OnInit {
  @Input() blob: string
  @Input() smile_sequence: number[]
  @Input() filler_sequence: number[]
  @Input() negative_sequence: number[]
  @Input() speed_sequence: number[]
  @Input() smile_result: number
  @Input() filler_result: number
  @Input() negative_result: number
  @Input() time_result: number
  @Input() project_id: number

  blobUrl: string
  download_link: HTMLAnchorElement = document.createElement('a');

  left_target: number = 0
  time_diff: number
  result_message: string = ""

  constructor(
    public modalController: ModalController,
    public gs: GlobalService
  ) { }

  ngOnInit() {
    this.checkResult()
    console.log(this.blob)
    this.blobUrl = URL.createObjectURL(this.blob);
    const playbackVideo: any = document.getElementById('playback_video');
    playbackVideo.src = this.blobUrl;
    // const download_link: any = document.getElementById('download')
    // download_link.download = "movie.webm";
    // download_link.href = this.blobUrl;
    // download_link.style.display = "block";
    // this.download_link.click();  // Direct auto download
  }

  checkResult = () => {
    this.gs.httpGet(environment.url+'project/'+this.project_id+'/get_target').subscribe(
      (res) => {
        // 今まで未達成 & 今回も未達成
        if ((res["smile_times"] > res["smile_result"]) && (res["smile_times"] > this.smile_result)) {
          this.left_target = this.left_target + 1
        }
        if ((res["filler_times"] <= res["filler_result"]) && (res["filler_times"] <= this.filler_result)) {
          this.left_target = this.left_target + 1
        }
        if ((res["negative_times"] < res["negative_result"]) && (res["negative_times"] <= this.negative_result)) {
          this.left_target = this.left_target + 1
        }
        // m sの復元
        const target_time: number = (60000 * res["time_min"]) + (1000 * res["time_sec"])
        //時間の誤差を出す
        this.time_diff = Math.abs(target_time - this.time_result)
        if ((30 < res["time_result"]) && (30 < this.time_diff)) {
          this.left_target = this.left_target + 1
        }
        console.log
        if (this.left_target > 0) this.result_message = "🏆 あと"+this.left_target+"項目で目標達成"
        else this.result_message = "🎉 目標オールクリアおめでとう！"

        this.reportResult()  // 時間を先に測定する必要がある
      }
    )
  }
  reportResult = () => {
    const body = {
      "smile_result": this.smile_result,
      "filler_result": this.filler_result,
      "negative_result": this.negative_result,
      "time_result": this.time_diff
    }
    console.log(body)
    this.gs.http(environment.url+'project/'+this.project_id+'/set_result', body).subscribe(
      (res) => console.log(res)
    )
  }

  dismiss = () => {
    this.modalController.dismiss()
  }

  download = () => {
    const blobUrl = URL.createObjectURL(this.blob);
    this.download_link.download = "movie.webm";
    this.download_link.href = blobUrl;
    this.download_link.style.display = "block";
    this.download_link.click();  // Direct auto download
  }

}
