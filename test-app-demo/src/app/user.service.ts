import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient) { }

  createUser(user): Promise<any> {
    return this.http.post('http://localhost:3000/api/addUser', user).toPromise()
    .then(response => {
      return Promise.resolve(response);
    })
  }
  list(): Promise<any> {
    return this.http.get('http://localhost:3000/api/list').toPromise()
      .then(response => {
        return Promise.resolve(response);
      })
  }
  edit(id): Promise<any> {
    return this.http.get('http://localhost:3000/api/edit/'+ id).toPromise()
      .then(response => {
        return Promise.resolve(response);
      })
  }

  delete(id): Promise<any> {
    return this.http.get('http://localhost:3000/api/delete/'+ id).toPromise()
      .then(response => {
        return Promise.resolve(response);
      })
  }
}
