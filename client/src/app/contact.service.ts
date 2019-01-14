import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Contact} from './contact';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class ContactService {

  constructor(private  http: HttpClient) {   }
  //ret Contact Service
  getContacts(){
    
    return this.http.get<Contact[]>('http://localhost:3000/api/contacts');
    //return this.http.get('http://localhost:3000/api/contacts').pipe(map((res:Response)=>res.json()));
    //pipe() links operators together. combines multiple functions to a single function
  }
  //add contact method
  addContact(newContact){
    console.log(newContact);
    return this.http.post<Contact>('http://localhost:3000/api/contacts', newContact,httpOptions);
  }
  //delete method
  deleteContact(id): Observable<Contact>{
    const url = `http://localhost:3000/api/contacts/${id}`;
    console.log(url);
    return this.http.delete<Contact>(url, httpOptions);
  }
}  