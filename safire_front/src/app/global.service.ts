import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { timeout, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json; charset=UTF-8'
  })
};
const HTTP_OPTIONS_GET = {
  headers: new HttpHeaders({
  })
};
const HTTP_OPTIONS_ABST = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json; charset=UTF-8',
    'Ocp-Apim-Subscription-Key': '06adf4e018174acca54b1d98b5a633e9',
    'Accept': 'application/json'
  },),
  observe: "response" as 'body'
};
const HTTP_OPTIONS_ABST_GET = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json; charset=UTF-8',
    'Ocp-Apim-Subscription-Key': '06adf4e018174acca54b1d98b5a633e9',
    'Accept': 'application/json'
  },)
};
const HTTP_OPTIONS_NEGATIVE = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json; charset=UTF-8',
    'Ocp-Apim-Subscription-Key': '06adf4e018174acca54b1d98b5a633e9',
    'Accept': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(
    private _http: HttpClient
  ) { }

  // httpポスト処理
  // @param {string} _postUrl - 送信URL
  // @param {any} _trans_data - 送信データ（デフォルト空）
  // @return {Observable<any>} http.post処理のレスポンス
  public http(_postUrl: string, _trans_data: any = ''): Observable<any> {
    let ret: Observable<any>;
    let postUrl: string;
    postUrl = _postUrl;
    ret = this._http.post(postUrl, _trans_data, HTTP_OPTIONS)
    .pipe(
      timeout(10000),
      catchError(this.handleError())
    );
    return ret;
  }
  public httpAbst(_postUrl: string, _trans_data: any = ''): Observable<any> {
    let ret: Observable<any>;
    let postUrl: string;
    postUrl = _postUrl;
    ret = this._http.post(postUrl, _trans_data, HTTP_OPTIONS_ABST)
    .pipe(
      timeout(10000),
      catchError(this.handleError())
    );
    return ret;
  }
  public httpNegative(_postUrl: string, _trans_data: any = ''): Observable<any> {
    let ret: Observable<any>;
    let postUrl: string;
    postUrl = _postUrl;
    ret = this._http.post(postUrl, _trans_data, HTTP_OPTIONS_NEGATIVE)
    .pipe(
      timeout(10000),
      catchError(this.handleError())
    );
    return ret;
  }

  public httpPut(_postUrl: string, _trans_data: any = ''): Observable<any> {
    let ret: Observable<any>;
    let postUrl: string;
    postUrl = _postUrl;
    ret = this._http.put(postUrl, _trans_data, HTTP_OPTIONS)
    .pipe(
      timeout(10000),
      catchError(this.handleError())
    );
    return ret;
  }

  public httpGet(_getUrl: string): Observable<any> {
    let ret: Observable<any>;
    let getUrl: string;
    getUrl = _getUrl;
    ret = this._http.get(getUrl, HTTP_OPTIONS_GET)
    .pipe(
      timeout(10000),
      catchError(this.handleError())
    );
    return ret;
  }
  public httpGetAbst(_getUrl: string): Observable<any> {
    let ret: Observable<any>;
    let getUrl: string;
    getUrl = _getUrl;
    ret = this._http.get(getUrl, HTTP_OPTIONS_ABST_GET)
    .pipe(
      timeout(10000),
      catchError(this.handleError())
    );
    return ret;
  }

   // Observable のエラーを返却します
   // @param 無し
   // @return {Observable<any>}
   private handleError(): any {
     return (error: any): Observable<any> => {
       const ret = {
         'status': error.status
         , 'data': error.statusText + '/' + error.url
       };
       return throwError(ret);
     };
   }
}
