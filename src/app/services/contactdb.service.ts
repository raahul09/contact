import { Contact } from './contact';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class ContactdbService {
  
 
   private storage: SQLiteObject;
  contactList = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private platform: Platform, 
    private sqlite: SQLite, 
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter,
  ) {
   let  data={
      name :'Contacts.db', 
    location:'default'}
    this.platform.ready().then(()=>{
      this.sqlite.create(data).then((db:SQLiteObject)=>{
        this.storage= db;
        this.createTable()
        this.getFakeData();
    })
      
    })
    
   }

   private createTable(): void {
    let data = [];
    this.storage.executeSql("CREATE TABLE IF NOT EXISTS `Contacts` ( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, `name` TEXT NOT NULL, `phone` TEXT NOT NULL, `email` TEXT NOT NULL )",data )
       .then(() => console.log('table créée'))
       .catch(e => console.log(e));
  
  }

  


   dbState() {
    return this.isDbReady.asObservable();
  }
 
  fetchContact(): Observable<Contact[]> {
    return this.contactList.asObservable();
  }

    // Render fake data
    getFakeData() {
      this.httpClient.get(
        'assets/Contacts.sql', 
        {responseType: 'text'}
      ).subscribe(data => {
        this.sqlPorter.importSqlToDb(this.storage, data)
          .then(_ => {
            this.getContacts();
            this.isDbReady.next(true);
          })
          .catch(error => console.error(error));
      });
    }

// Get list
getContacts(){
  return this.storage.executeSql('SELECT * FROM Contacts', []).then(res => {
    let items: Contact[] = [];
    if (res.rows.length > 0) {
      for (var i = 0; i < res.rows.length; i++) { 
        items.push({ 
          id: res.rows.item(i).id,
          name: res.rows.item(i).name,  
          phone: res.rows.item(i).phone,
          email: res.rows.item(i).email
         });
      }
    }
    this.contactList.next(items);
  });
}

// Add
addContact(name , phone , email) {
  let data = [name, phone,email];
  return this.storage.executeSql('INSERT INTO Contacts (name, phone, email) VALUES (?, ?, ?)', data)
  .then(res => {
    this.getContacts();
  });
}

// Get single object
getContact(id): Promise<Contact> {
  return this.storage.executeSql('SELECT * FROM Contacts WHERE id = ?', [id]).then(res => { 
    return {
      id: res.rows.item(0).id,
      name: res.rows.item(0).name,
      phone: res.rows.item(0).phone,  
      email: res.rows.item(0).email
    }
  });
}

// Update
updateContact(id, Contact: Contact) {
  let data = [Contact.name, Contact.phone,Contact.email];
  return this.storage.executeSql(`UPDATE Contacts SET name = ?, phone = ?,email = ? WHERE id = ${id}`, data)
  .then(data => {
    this.getContacts();
  })
}

// Delete
deleteContact(id) {
  return this.storage.executeSql('DELETE FROM Contacts WHERE id = ?', [id])
  .then(_ => {
    this.getContacts();
  });
}


























}
