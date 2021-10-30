# SaFire: 教育 × Tech

[![IMAGE ALT TEXT HERE](https://user-images.githubusercontent.com/49345024/139520066-a80fbcbd-2ac9-4c0c-a3c2-8e08d0a58c6b.png)](https://youtu.be/W0Cnm3vreQk)

## 外部リンク
### 製品説明動画
URL: https://youtu.be/W0Cnm3vreQk
### Web上での公開URL
URL: https://safire-betterhack.web.app/

## 製品概要
### 背景
製作者らが、小中学生向けのプログラミング教室でアルバイトしていたときの、実際の経験、課題感に基づいて開発は始まった。<br>
小中学生は成果についての主体的な対話（プレゼン）が苦手。子供にとって、上手く発表できるかの不安が大きい。<br>
教育において最大重要項目の『主体性」を育む障壁になっている。
<br><br>
<img src='https://user-images.githubusercontent.com/63716217/139517464-7ee96940-c1be-480a-b57a-bacc979cc8ae.png' width='70%' height='70%'>

そこで、場数・経験の不足の課題に着目。<br>
小中学生でも簡易に利用できる発表＆練習ツールによって経験値をブースト！！
<br><br>
<img src='https://user-images.githubusercontent.com/63716217/139517470-4b65b52d-9798-4c7c-bd0d-63ac55a10c58.png' width='70%' height='70%'>

### 製品説明
小中学生のためのポートフォリオサイトです。<br>
発表資料の自動作成や発表態度のフィードバックにより、小中学生の発表や練習をサポートします！！<br>
また、レコメンドシステムでユーザ類似度の高い学生を推薦し、他学生のプロジェクトを閲覧する事による『主体的』な学びを推進します<br>
他学生の作品へのお気に入り機能やメンバー・共同編集なども充実！

### 特長
#### 1. 低リテラシーでも発表資料を簡単に作成！！
小中学生が入力したプロジェクト情報をもとに、発表資料を自動作。<br>
発表資料の作成に悩まず、発表練習に時間を割くことが可能！！

#### 2. AIを用いて高いプレゼン練習効果を実現！！
発表練習中の発声のフィラー、ネガティブな表現、表情の笑顔の回数や発声スピードをスコアリング。<br>
過去に行った発表練習のスコア履歴も確認できる。<br>
より良い発表ができるようサポート！！

### 解決出来ること
* 発表に対する場数・経験不足を解決し、小中学生の『主体性』を育みます
### 今後の展望
* マイページに成長記録を確認できるダッシュボードを実装
* 独自の採点・実績システムによるゲーミフィケーションを実装し、更に楽しく主体的な発表練習を促進
### 注力したこと
* 発表練習画面・発表練習スコアのダッシュボードUX
* 発表態度のフィードバック機能

## 開発技術
### 独自技術
#### ハッカソンで開発した独自機能・技術
* 「発表練習画面」「発表練習結果（スコア）」「発表練習に関するダッシュボード」に関するシステムと構成
  * 小中学生でも分かって、楽しめるような高度なUXを実現。
  * 楽しめるだけでなく、効果的な練習ができるよう、便利な練習振り返り機能にも注力した。
* CI/CDなどのDevOpsについて、GitHub Actionsを用いて実装した。
  * Ionic -> Firebase
  * Rails -> EC2
* `特に力を入れた部分をファイルリンク、またはcommit_idを記載してください。`
  * 特に力を入れた部分のcommit_id
    * 165428a （「発表練習画面」や「発表練習結果」の表示プロセスやシステム設計に関するもの）

### 活用した技術
#### API・データ
* [faceapi.js](https://github.com/justadudewhohacks/face-api.js/)

#### フレームワーク・ライブラリ・モジュール
* [Rasa](https://github.com/RasaHQ/rasa)
* Angular.js
* Chart.js
* Rails
* Python
* Azure
* AWS
* ionic
* Firebase
* ngrok

#### システム構成
<img width="80%" height='80%' alt="スクリーンショット 2021-10-30 10 59 16" src="https://user-images.githubusercontent.com/63716217/139516584-5adf006e-794c-467b-b670-ec17defb58ee.png">

<img width="80%" height='80%' alt="スクリーンショット 2021-10-30 10 59 23" src="https://user-images.githubusercontent.com/63716217/139516585-27c65fb6-e6f3-4d0e-b4aa-80f85fd8766e.png">


#### 製品に取り入れた研究内容（データ・ソフトウェアなど）（※アカデミック部門の場合のみ提出必須）
```
@article{zhang2016joint,
  title={Joint face detection and alignment using multitask cascaded convolutional networks},
  author={Zhang, Kaipeng and Zhang, Zhanpeng and Li, Zhifeng and Qiao, Yu},
  journal={IEEE Signal Processing Letters},
  volume={23},
  number={10},
  pages={1499--1503},
  year={2016},
  publisher={IEEE}
}
```
