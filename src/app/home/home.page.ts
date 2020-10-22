import { AngularFireAuth } from '@angular/fire/auth';

import { ContactdbService } from './../services/contactdb.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  show: boolean = true;
  mainForm: FormGroup;
  Data: any[] = []

  constructor(
    private db: ContactdbService,
    public formBuilder: FormBuilder,
    private toast: ToastController,
    private router: Router,
    private loadingController: LoadingController,
    public afAuth: AngularFireAuth,
  ) { }

  ngOnInit() {
    this.db.dbState().subscribe((res) => {
      if (res) {
        this.db.fetchContact().subscribe(item => {
          this.Data = item
        })
      }
    });

    this.mainForm = this.formBuilder.group({
      name: [''],
      phone: [''],
      email: ['']
    })
  }

  storeData() {
    this.db.addContact(
      this.mainForm.value.name,
      this.mainForm.value.phone,
      this.mainForm.value.email,
    ).then((res) => {
      this.mainForm.reset();
    })
  }


  deletecontact(id) {
    this.db.deleteContact(id).then(async (res) => {
      let toast = await this.toast.create({
        message: 'contact deleted',
        duration: 2500
      });
      toast.present();
    })
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Hellooo',
      duration: 2000,
      spinner: 'bubbles'
    });
    await loading.present();
  }

  logout() {
     this.afAuth.signOut().then(()=>{
      this.router.navigateByUrl('/login');
     })
        
   
    
  }


}

