import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  selectedLanguage: string;
  languages: {id: string, title: string}[] = [];

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    // initialize translate service
    this.translateService.use(environment.defaultLocale);
    this.selectedLanguage = environment.defaultLocale;

    this.translateService.get(environment.locales.map(x => `LANGUAGES.${x.toUpperCase()}`))
      .subscribe(translations => {
        // init dropdown list with TRANSLATED list of languages from config
        this.languages = environment.locales.map(x => {
          return {
            id: x,
            title: translations[`LANGUAGES.${x.toUpperCase()}`],
          };
        });
      });

    // it's also possible (and convenient) to use this.translateService.instant
    // but it could be NOT loaded yet at this moment, OnInit of App.Component
  }

  changeLocale() {
    this.translateService.use(this.selectedLanguage);
  }
}
