import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GlobalService } from '../global.service';
import { TextAnalyticsClient, AzureKeyCredential } from "@azure/ai-text-analytics";
import { LoadingController } from '@ionic/angular';

import * as $ from "jquery";
import * as SimpleMDE from 'simplemde';
import * as marked from 'marked';

@Component({
  selector: 'app-new_project',
  templateUrl: 'new_project.page.html',
  styleUrls: ['new_project.page.scss']
})

export class NewProjectPage {
  url: string = 'https://techfusion-studio.com/safire/'
  postObj: any = {};
  returnObj: any = {};

  file: File = null;
  imgSrcProject: string | ArrayBuffer = "";
  imgSrcBackground: string | ArrayBuffer = "";
  imgSrcPoint: string | ArrayBuffer = "";
  imgSrcTech: string | ArrayBuffer = "";

  projectDetail: string = null;
  simplemde: SimpleMDE;

  imgHeight: number = 600;

  /** 登録する情報 **/
  title: string;
  thumbnail: string;
  description: string;
  user_id: string = null;
  allCheckBoxes: any;
  tag_list: any[] = [];
  description_background: string;
  thumbnail_background: any;
  description_idea: string;
  thumbnail_idea: any;
  description_technology: string;
  thumbnail_technology: any;
  appendix: string;
  color: string = "#2889e9";

  interval: any[] = []
  loading: any

  edit_flag: boolean = false
  project_id: number

  constructor(
    private router: Router,
    public gs: GlobalService,
    public loadingController: LoadingController,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {

    this.simplemde = new SimpleMDE({
      element: document.getElementById("editor"),
      toolbar: [
          "bold",
          "italic",
          "strikethrough",
          "heading",
          "code",
          "quote",
          "unordered-list",
          "ordered-list",
          "clean-block",
          "link",
          "image",
          "table",
          "horizontal-rule",
          "preview",
          "side-by-side",
          "fullscreen",
          "guide"
      ],
      spellChecker: false,
    });

    this.simplemde.codemirror.on('refresh', () => {
        if (this.simplemde.isFullscreenActive()) {
            $('header').css('display', 'none');
        } else {
            $('header').css('display', 'block');
        }
    });

    this.route.params.subscribe(
      params => {
        if (params['project_id'] !== undefined) {
          this.edit_flag = true
          this.project_id = params['project_id']
          this.gs.httpGet("https://techfusion-studio.com/safire/project/"+this.project_id).subscribe(
            res => {
              console.log(res)
              this.title = res["title"]
              this.thumbnail = res["thumbnail"]
              this.user_id = res["user_id"]

              var element: HTMLInputElement = <HTMLInputElement>document.getElementById('project_description')
              element.value = res["description"]
              var element_background: HTMLInputElement = <HTMLInputElement>document.getElementById('background_description');
              element_background.value = res["description_background"]
              var element_idea: HTMLInputElement = <HTMLInputElement>document.getElementById('point_description')
              element_idea.value = res["description_idea"]
              var element_technology: HTMLInputElement = <HTMLInputElement>document.getElementById('tech_description')
              this.description_technology = element_technology.value = res["description_technology"]

              this.allCheckBoxes =  document.querySelectorAll("input[type='checkbox']") as NodeListOf<HTMLInputElement>
              this.allCheckBoxes.forEach(checkBox => {
                if (res["tag_list"].includes(checkBox.value)) checkBox.checked = true
              });
              
              this.simplemde.value(res["appendix"])
              this.color = '#'+res["color"]

              this.thumbnail = res["thumbnail"]
              this.imgSrcProject = this.thumbnail == null ? '/assets/img/project_img_none.png' : this.thumbnail
              this.thumbnail_background = res["thumbnail_background"]
              this.imgSrcBackground = this.thumbnail_background == null ? '/assets/img/project_img_none.png' : this.thumbnail_background
              this.thumbnail_idea = res["thumbnail_idea"]
              this.imgSrcPoint = this.thumbnail_idea == null ? '/assets/img/project_img_none.png' : this.thumbnail_idea
              this.thumbnail_technology = res["thumbnail_technology"]
              this.imgSrcTech = this.thumbnail_technology == null ? '/assets/img/project_img_none.png' : this.thumbnail_technology
            }
          )
        }
        else {
          this.edit_flag = false
          this.imgSrcProject = '/assets/img/project_img_none.png'
          this.imgSrcBackground = '/assets/img/project_img_none.png'
          this.imgSrcPoint = '/assets/img/project_img_none.png'
          this.imgSrcTech = '/assets/img/project_img_none.png'
        }
        // console.log(this.edit_flag)
      }
    )

    marked.setOptions({
      sanitize: true,
      sanitizer: escape,
      breaks : true
    });
  }

  postProject = () => {
    const body = this.postObj;
    console.log(body)

    if (this.edit_flag) {
      this.gs.httpPut(this.url+'project/'+this.project_id, body).subscribe(
        res => {
          this.returnObj = res;
          console.log(this.returnObj['message']);
          if(this.returnObj['message']){
            console.log('Success: Post Project')
            this.router.navigate(['home']);
          }
          else {
            console.log('Error');
            return;
          }
        }
      )
    }
    else {
      this.gs.http(this.url+'project', body).subscribe(
        res => {
          this.returnObj = res;
          console.log(this.returnObj['message']);
          if(this.returnObj['message']){
            console.log('Success: Post Project')
            this.router.navigate(['home']);
          }
          else {
            console.log('Error');
            return;
          }
        }
      )
    }
  }

  setValues = () => {
    this.title = this.title;
    //thumbnail -> onChangeFileInputProject
    var element: HTMLInputElement = <HTMLInputElement>document.getElementById('project_description');
    this.description = element.value;
    this.user_id = this.user_id == null ? localStorage.user_id : this.user_id

    const allCheckBoxes = document.querySelectorAll("input[type='checkbox']") as NodeListOf<HTMLInputElement>;
    allCheckBoxes.forEach(checkBox => {
      if(checkBox && checkBox.checked) {
        console.log('yeah!')
        this.tag_list.push(checkBox.value)
      }
    });

    var element_background: HTMLInputElement = <HTMLInputElement>document.getElementById('background_description');
    this.description_background = element_background.value
    //thumbnail_background -> onChangeFileInputBackground
    var element_idea: HTMLInputElement = <HTMLInputElement>document.getElementById('point_description')
    this.description_idea = element_idea.value;
    //thumbnail_idea -> onChangeFileInputPoint
    var element_technology: HTMLInputElement = <HTMLInputElement>document.getElementById('tech_description')
    this.description_technology = element_technology.value;
    //thumbnail_technology -> onChangeFileInputTechnology
    this.appendix = this.simplemde.value();
    this.color = this.color;
  }

  onChangeFileInputProject(event) {
    var file: any = event.srcElement.files[0];
    var fileReader: any = new FileReader();
    var img = new Image();
    fileReader.onloadend = () => {
      img.onload = () => {
        // 画像軽量化
        console.log('Image Processing');
        const imgType = img.src.substring(5, img.src.indexOf(';'));
        const imgWidth = img.width * (this.imgHeight / img.height);
        const canvas = document.createElement('canvas');
        canvas.width = imgWidth;
        canvas.height = this.imgHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, imgWidth, this.imgHeight);
        this.thumbnail = canvas.toDataURL(imgType);
      }
      $("#thumbnails").css('content', 'none');
      this.imgSrcProject = fileReader.result;
      // 画像ファイルを base64 文字列に変換します
      img.src = fileReader.result;
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  onChangeFileInputBackground(event) {
    var file: any = event.srcElement.files[0];
    var fileReader: any = new FileReader();
    var img = new Image();
    fileReader.onloadend = () => {
      img.onload = () => {
        // 画像軽量化
        console.log('Image Processing');
        const imgType = img.src.substring(5, img.src.indexOf(';'));
        const imgWidth = img.width * (this.imgHeight / img.height);
        const canvas = document.createElement('canvas');
        canvas.width = imgWidth;
        canvas.height = this.imgHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, imgWidth, this.imgHeight);
        this.thumbnail_background = canvas.toDataURL(imgType);
      }
      $("#detail_background_img").css('content', 'none');
      this.imgSrcBackground = fileReader.result;
      // 画像ファイルを base64 文字列に変換します
      img.src = fileReader.result;
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  onChangeFileInputPoint(event) {
    var file: any = event.srcElement.files[0];
    var fileReader: any = new FileReader();
    var img = new Image();
    fileReader.onloadend = () => {
      img.onload = () => {
        // 画像軽量化
        console.log('Image Processing');
        const imgType = img.src.substring(5, img.src.indexOf(';'));
        const imgWidth = img.width * (this.imgHeight / img.height);
        const canvas = document.createElement('canvas');
        canvas.width = imgWidth;
        canvas.height = this.imgHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, imgWidth, this.imgHeight);
        this.thumbnail_idea = canvas.toDataURL(imgType);
      }
      $("#detail_point_img").css('content', 'none');
      this.imgSrcPoint = fileReader.result;
      // 画像ファイルを base64 文字列に変換します
      img.src = fileReader.result;
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  onChangeFileInputTech(event) {
    var file: any = event.srcElement.files[0];
    var fileReader: any = new FileReader();
    var img = new Image();
    fileReader.onloadend = () => {
      img.onload = () => {
        // 画像軽量化
        console.log('Image Processing');
        const imgType = img.src.substring(5, img.src.indexOf(';'));
        const imgWidth = img.width * (this.imgHeight / img.height);
        const canvas = document.createElement('canvas');
        canvas.width = imgWidth;
        canvas.height = this.imgHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, imgWidth, this.imgHeight);
        this.thumbnail_technology = canvas.toDataURL(imgType);
      }
      $("#detail_tech_img").css('content', 'none');
      this.imgSrcTech = fileReader.result;
      // 画像ファイルを base64 文字列に変換します
      img.src = fileReader.result;
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  async keyPhrases() {
    this.setValues(); //画像以外の登録情報をセットする
    this.postObj['title'] = this.title;
    this.postObj['thumbnail'] = this.thumbnail;

    var element: HTMLInputElement = <HTMLInputElement>document.getElementById('project_description')
    this.postObj['description'] = element.value
    var element_background: HTMLInputElement = <HTMLInputElement>document.getElementById('background_description');
    this.postObj['description_background'] = element_background.value
    var element_idea: HTMLInputElement = <HTMLInputElement>document.getElementById('point_description')
    this.postObj['description_idea'] = element_idea.value
    var element_technology: HTMLInputElement = <HTMLInputElement>document.getElementById('tech_description')
    this.postObj['description_technology'] = element_technology.value
    
    this.postObj['user_id'] = this.user_id;
    this.postObj['tag_list'] = this.tag_list;
    this.postObj['thumbnail_background'] = this.thumbnail_background;
    this.postObj['thumbnail_idea'] = this.thumbnail_idea;
    this.postObj['thumbnail_technology'] = this.thumbnail_technology;
    this.postObj['appendix'] = this.appendix;
    this.postObj['color'] = this.color.replace('#', '');
    
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 120000
    });
    await this.loading.present();
    this.getKeyPhrase(this.postObj["description_background"], 0)
  }

  async getKeyPhrase(text: string, times: number ) {

    /*
    const key = '06adf4e018174acca54b1d98b5a633e9';
    const endpoint = 'https://safire.cognitiveservices.azure.com/';

    const textAnalyticsClient = new TextAnalyticsClient(endpoint,  new AzureKeyCredential(key));

    const keyPhrasesInput = [
      "1. とにかく無駄に楽しく安全な一人運転を実現．てれ助手席の「話し相手」✕「前方確認」でもう漫然運転はさせません．  2. 基本的に音声ありの顔出し無し．気軽に始められるスマホアプリ．  3. 運転中につき，携帯を触る機会を減らすオートログイン機能やワンタッチ操作実装．",
      "ja"
    ];
    const keyPhraseResult = await textAnalyticsClient.extractKeyPhrases(keyPhrasesInput);
    console.log(keyPhraseResult)
    */
    /*
    keyPhraseResult.forEach(document => {
        console.log(`ID: ${document.id}`);
        console.log(`\tDocument Key Phrases: ${document.keyPhrases}`);
    });*/
    const abstract_id = String(Math.floor(Math.random() * 1000000000))
    let body = {
      "analysisInput": {
        "documents": []
      },
      "tasks": {
        "extractiveSummarizationTasks": [
          {
            "parameters": {
              "model-version": "latest",
              "sentenceCount": 4,
              "sortBy": "Offset"
            }
          }
        ]
      }
    }
    body["analysisInput"]["documents"].push({
      "language": "ja",
      "id": `${abstract_id}`,
      "text": `${text}`  // description
    })
    this.gs.httpAbst('https://safire.cognitiveservices.azure.com/text/analytics/v3.2-preview.1/analyze', body).subscribe(
      res => {
        console.log(res.headers.get('operation-location'))
        this.interval[times] = setInterval(() => {
          this.gs.httpGetAbst(res.headers.get('operation-location')).subscribe(
            res => {
              console.log(res)
              // listの中の'text'を採用する
              if (res["status"] == "succeeded") {
                const abstract = res["tasks"]["extractiveSummarizationTasks"][0]["results"]["documents"][0]["sentences"]
                if (times == 0) {
                  this.postObj['abstract_background'] = abstract;
                  this.getKeyPhrase(this.postObj["description_idea"], 1)
                }
                else if (times == 1) {
                  this.postObj['abstract_idea'] = abstract;
                  this.getKeyPhrase(this.postObj["description_technology"], 2)
                }
                else if (times == 2) {
                  this.postObj['abstract_technology'] = abstract;
                  this.postProject()
                  this.loading.dismiss()
                }
                clearInterval(this.interval[times])
              }
            }
          )
        }, 3000)
      }
    )
  }
}
