import { AngularFireAuth } from '@angular/fire/auth';
import { ContactdbService } from './../services/contactdb.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";

import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  editForm: FormGroup;
  id: any;

  constructor(
    private db: ContactdbService,
    private router: Router,
    public formBuilder: FormBuilder,
    private actRoute: ActivatedRoute,
    public afAuth:AngularFireAuth
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');

    this.db.getContact(this.id).then(res => {
      this.editForm.setValue({
        name: res['name'],
        phone: res['phone'],
        email: res['email']
      })
    })
  }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      name: [''],
      phone: [''],
      email: ['']
    })
  }

  saveForm(){
    this.db.updateContact(this.id, this.editForm.value)
    .then( (res) => {
      console.log(res)
      this.router.navigate(['/home']);
    })
  }

}