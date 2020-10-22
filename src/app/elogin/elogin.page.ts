import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-elogin',
  templateUrl: './elogin.page.html',
  styleUrls: ['./elogin.page.scss'],
})
export class EloginPage implements OnInit {

  
  form: FormGroup;
  type: 'login' | 'signup' | 'reset' = 'signup';
  serverMessage: string;
  loading: false;

  constructor( private fb: FormBuilder, public afAuth:AngularFireAuth ,private rout:Router ,public LoadingController:LoadingController) { 
  
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(6), Validators.required]],
      passwordConfirm: ['', []],
    });
  }
  // change the type of form 
  changeType(val) {
    this.type = val
  }

  get isSignUp() {
    return this.type === 'signup';
  }

  get islogin() {
    return this.type === 'login';
  }
  get isPasswordReset() {
    return this.type === 'reset';
  }
  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }
  get passwordConfirm() {
    return this.form.get('passwordConfirm');
  }
  // check form is sign up or not
  get passwordDoseMatch() {
    if (this.type !== 'signup') {
      return true;
    } else {
      return this.password.value === this.passwordConfirm.value;
    }
  }
  async onSubmit(){
    this.loading=false;

    const email = this.email.value;
    const password = this.password.value;

    try{
      if(this.islogin){
        if (this.afAuth.user) {
    await      this.rout.navigate(['home']);
        } else {
    
          
          await this.afAuth.signInWithEmailAndPassword(email,password).then(()=>{
            this.LoadingController.dismiss();
          })
          
        }
       
      }
      if(this.isSignUp){
        if (this.afAuth.user) {
          await      this.rout.navigate(['home']);
           } else {
            
                await this.afAuth.createUserWithEmailAndPassword(email,password);
                this.serverMessage= "your account as created switch to sign in Thankyou"
           }
        
      }
      if(this.isPasswordReset){
        await this.afAuth.sendPasswordResetEmail(email);
        this.serverMessage = 'check your email';
      }

    }
    catch(err){
      this.serverMessage = err;
    }
    this.loading=false;

  }
}
