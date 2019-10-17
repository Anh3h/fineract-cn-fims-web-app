/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ITdLoadingConfig, LoadingType, TdLoadingService} from '@covalent/core';
import {TranslateService} from '@ngx-translate/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as fromRoot from '../store';
import {Store} from '@ngrx/store';
import {LOGIN} from '../store/security/security.actions';
import {Subscription} from 'rxjs/Subscription';
import {TRANSLATE_STORAGE_KEY} from '../common/i18n/translate';
import {Observable} from 'rxjs/Observable';
import {MatSelectChange} from '@angular/material';

@Component({
  selector: 'fims-login',
  templateUrl: './login.component.html',
  styles: [
    `
      .container-fluid {
        background-image: url('./assets/images/bg-1.jpg');
        background-position: center top;
      }
      .login-form {
        width: 430px;
        margin: 0 auto;
      }
      img {
        width: 312px;
        height: 51px;
        display: block;
        margin: 0 auto 3rem auto;
      }
      @media (max-width: 575.98px) {
        img {
          width: 255px;
          height: 51px;
        }
      }
      h3.title {
        color: #fff;
        text-align: center;
        font-size: 1.5rem;
        font-weight: 500;
      }
      .login-form {
        padding: 6% 1rem 1rem 0rem;
      }
      form {
        margin: 4rem auto;
      }
      input {
        border-radius: 46px;
        border: none;
        background: rgba(67, 34, 167, 0.4);
        color: #fff;
        height: 46px;  
        padding-left: 1.5rem;
        padding-right: 1.5rem;
        margin-top: 1.5rem;
      }
      input:focus {
        color: #fff;
        background: rgba(67, 34, 167, 0.4);
        border: none;
      }
      small {
        color: #646c9a;
        font-weight: 550;
        padding-left: 1.5rem;
      }
      ::placeholder {
        color: #FFF;
        opacity: 0.7;
        font-size: 14px;
        font-weight: 550;
      }
      .form-action {
        text-align: center;
      }
      button[type=submit] {
        height: 46px;
        display: inline-block;
        text-align: center;
        padding-left: 3rem;
        padding-right: 3rem;
        margin-top: 0.8rem;
        border-radius: 60px;
        background: transparent;
        color: rgba(255, 255, 255, 0.8);
        border-color: rgba(255, 255, 255, 0.4);
      }
      .security-msg {
        margin-top: 5rem;
        font-size: 1rem;
        font-weight: 500;
        color: #bbabf1;
        text-align: center;
      }
    `
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  private loadingSubscription: Subscription;

  currentLanguage: string;

  languageOptions: any[] = [
    {id: 'en', label: 'Welcome to fims'},
    {id: 'es', label: 'Bienvenido a fims'}
  ];

  form: FormGroup;

  error$: Observable<string>;

  constructor(private _loadingService: TdLoadingService, private translate: TranslateService, private formBuilder: FormBuilder,
              private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.currentLanguage = this.translate.currentLang || this.translate.getDefaultLang();

    const options: ITdLoadingConfig = {
      name: 'login',
      type: LoadingType.Circular,
    };

    this._loadingService.create(options);

    this.form = this.formBuilder.group({
      tenant: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.error$ = this.store.select(fromRoot.getAuthenticationError)
      .filter(error => !!error)
      .do(() => this.form.get('password').setValue(''))
      .map(error => 'Sorry, that login did not work.');

    this.loadingSubscription = this.store.select(fromRoot.getAuthenticationLoading).subscribe(loading => {
      if (loading) {
        this._loadingService.register('login');
      } else {
        this._loadingService.resolve('login');
      }
    });
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }

  login(): void {
    const tenant = this.form.get('tenant').value;
    const username = this.form.get('username').value;
    const password = this.form.get('password').value;
    console.log(tenant, username, password)
    this.store.dispatch({
      type: LOGIN, payload: {
        username,
        password,
        tenant
      }
    });
  }

  selectLanguage(selectChange: MatSelectChange): void {
    sessionStorage.setItem(TRANSLATE_STORAGE_KEY, selectChange.value);
    location.reload();
  }
}
