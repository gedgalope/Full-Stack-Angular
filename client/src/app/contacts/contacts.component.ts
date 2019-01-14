import { Component, OnInit } from '@angular/core';
import {ContactService} from '../contact.service';
import {Contact} from '../contact';
// import {Observable} from 'rxjs';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers: [ContactService]
})
export class ContactsComponent implements OnInit {
  contacts: Contact[];
  contact: Contact;
  _id:string;
  first_name:string;
  last_name:string;
  phone_number:string;
  constructor(private contactService: ContactService) { }

  addContact(){
    const newContact ={
      first_name: this.first_name,
      last_name: this.last_name,
      phone_number: this.phone_number
    }
    this.contactService.addContact(newContact).subscribe(
      contact => {
        this.contacts.push(contact);
      }
      );
      this.contactService.getContacts().subscribe((contacts)=> this.contacts = contacts);
  }

  deleteContact(id){
    var contacts = this.contacts;
    this.contactService.deleteContact(id).subscribe(data=>{
      if(data){
        for( var i=0; i<contacts.length; i++){
          if(contacts[i]._id == id){
            contacts.splice(i,1);
          }
        }
      }
    });
  }

  ngOnInit(){
    this.contactService.getContacts().subscribe((contacts)=> this.contacts = contacts);
  }
  
}
