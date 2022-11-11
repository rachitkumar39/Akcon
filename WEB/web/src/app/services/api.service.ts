import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseURL: string = environment.baseURL;
  constructor(private http: HttpClient) { }

  public login(body:any):Observable<any> {
    return this.http.post(`${this.baseURL}/auth/login`,body);
  }
  public generateOtp(id:any):Observable<any>{
    return this.http.get(`${this.baseURL}/auth/generateotp?id=${id}`);
  }
  public verifyOtp(body:any):Observable<any>{
    return this.http.post(`${this.baseURL}/auth/verifyotp`,body);
  }
  public getNewsList(id:any):Observable<any>{
    return this.http.get(`${this.baseURL}/news/getnewslist?id=${id}`);
  }
  public getEventList(id:any):Observable<any>{
    return this.http.get(`${this.baseURL}/post/geteventlist?id=${id}`);
  }
  public getPostList(id:any):Observable<any>{
    return this.http.get(`${this.baseURL}/post/getpostlist?id=${id}`);
  }
  public setPassword(body:any):Observable<any>{
    return this.http.post(`${this.baseURL}/auth/setpassword`,body);
  }
  public like(id:any):Observable<any>{
    return this.http.get(`${this.baseURL}/post/like?id=${id}`)
  }
  public disLike(id:any):Observable<any>{
    return this.http.get(`${this.baseURL}/post/dislike?id=${id}`)
  }
  public getPostDetail(id:any):Observable<any>{
    return this.http.get(`${this.baseURL}/post/getpostdetail?id=${id}`)
  }
  public getNewsDetail(id:any):Observable<any>{
    return this.http.get(`${this.baseURL}/news/getnewsdetail?id=${id}`);
  }
  public comment(body:any):Observable<any>{
    return this.http.put(`${this.baseURL}/post/comment`,body);
  }
  public getComment(body:any):Observable<any>{
    return this.http.post(`${this.baseURL}/post/getcomment`,body);
  }
  public deleteComment(body:any):Observable<any>{
    return this.http.post(`${this.baseURL}/post/deletecomment`,body);
  }
  public uploadImage(formData:any): Observable<any> {

    return this.http.post(`${this.baseURL}/shared/uploadimage`,formData);
  }
  public createPost(body:any): Observable<any> {
    return this.http.post(`${this.baseURL}/post/createpost`,body);
  }
  public createNews(body:any): Observable<any> {
    return this.http.post(`${this.baseURL}/news/createnews`,body);
  }
  public searchById(id:any):Observable<any>{
    return this.http.get(`${this.baseURL}/profile/search?id=${id}`);
  } 
  public createMessage(body:any): Observable<any> {
    return this.http.post(`${this.baseURL}/message/createmessage`,body);
  }
  public getUserList():Observable<any>{
    return this.http.get(`${this.baseURL}/message/getuserlist`);
  } 
  public getChatHistory(id:any):Observable<any>{
    return this.http.get(`${this.baseURL}/message/getchathistory?id=${id}`);
  }
  public updateProfileImage(imageurl:any):Observable<any>{
    return this.http.get(`${this.baseURL}/profile/updateprofileimage?imageurl=${imageurl}`);
  }
  public getprofile(id:any):Observable<any>{
    return this.http.get(`${this.baseURL}/profile/getprofile?id=${id}`);
  }
  public register(body:any): Observable<any> {
    return this.http.post(`${this.baseURL}/auth/register`,body);
  }
}
