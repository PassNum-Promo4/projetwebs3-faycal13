import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  btnDisabled = false;
  currentSettings: any;

  constructor(private data: DataService, private rest: RestApiService, private router: Router) { }

async ngOnInit() {
  try {
    if (!this.data.user) {
        await this.data.getProfile();
    }
    this.currentSettings = Object.assign({
      newPwd: '',
      pwdConfirm: ''
    }, this.data.user);
  } catch (error) {
    this.data.error(error);
  }
  }

  validate(settings) {
    if (settings['name']) {
        if (settings['email']) {
            if (settings['newPwd']) {
                if (settings['pwdConfirm']) {
                    if (settings['newPwd'] === settings['pwdConfirm']) {
                        return true;
                    } else {
                      this.data.error('Paswords do not match');
                    }
                } else {
                  this.data.error('Please enter confirmation Pasword');
                }
            } else {
              if (!settings['pwdConfirm']) {
                  return true;
              } else {
                this.data.error('Please enter new paswords');
              }
            }
        } else {
          this.data.error('Please enter your email');
        }
    } else {
      this.data.error('Please enter your name');
    }
  }

  async update() {
    this.btnDisabled = true;
    try {
      if (this.validate(this.currentSettings)) {
          const data = await this.rest.post(
            'http://localhost:3000/api/accounts/profile',
            {
              name: this.currentSettings['name'],
              email: this.currentSettings['email'],
              pasword: this.currentSettings['newPwd'],
              haveEvent: this.currentSettings['haveEvent']
            }
          );

          data['success']
          ? (this.data.getProfile(), this.data.success(data['message']))
          : this.data.error(data['message']);
      }
    } catch (error) {
      this.data.error(error['message']);
    }
    this.btnDisabled = false;
  }

  async delete (){
   this.btnDisabled = true;
   try {

       const data = await this.rest.delete(
         'http://localhost:3000/api/accounts/profile'
       );
       data['success']
         ? ( localStorage.clear() ,  this.router.navigate(['/']) )
         : this.data.error(data['message']);

   } catch (error) {
     this.data.error(error['message']);
   }
   this.btnDisabled = false;
}
}
