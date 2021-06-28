import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MyNote } from '../Interfaces/note.interface';
import { environment } from 'src/environments/environment';
import { TypeNote } from '../Interfaces/type-note.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpNoteService {

  constructor(private http: HttpClient) { }

  getNotes(): Promise<any> {
    return this.http.get(`${environment.routeApi}/notes`).toPromise();
  }

  postNote(data: MyNote): Promise<any> {
    return this.http.post(`${environment.routeApi}/notes`, data).toPromise();
  }

  deleteNote(id: number): Promise<any> {
    return this.http.delete( `${environment.routeApi}/notes/${id}`).toPromise();
  }

  putNote(id: number, data: MyNote): Promise<any> {
    return this.http.put( `${environment.routeApi}/notes/${id}`, data).toPromise();
  }

  getTypes(): Promise<any> {
    return this.http.get(`${environment.routeApi}/types`).toPromise();
  }

  postType(data: TypeNote): Promise<any> {
    return this.http.post(`${environment.routeApi}/types`, data).toPromise();
  }

  deleteType(id: number): Promise<any> {
    return this.http.delete( `${environment.routeApi}/types/${id}`).toPromise();
  }
}
