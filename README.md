# NgxTranslateAngular

## Development server

Run `nmp start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Translation

Translation and localization is implemented using upgraded @ngx-translate library
to add translated strings to markup (html) uses:

```html
<span>{{ '<name_of_string>' | translate }}</span>
```

to translate string in `*.ts` file use

```typescript
constructor(private translate: TranslateService) {}
...
title = this.translate.instant('KEY'),
```

in case if you need it at early stages of application (OnInit of AppComponent), use this

```typescript
constructor(private translate: TranslateService) {}
...
this.translateService.get(['KEY1', 'KEY2']))
      .subscribe(translations => {
        // init dropdown list with TRANSLATED list of languages from config
        console.log(translations['KEY1'])
        console.log(translations['KEY2'])
      });
```

If there is a string key, used for translation, but not presented in the current locale json file, you will see the error message in the UI instead of translated value
this behavior is implemented using `missing-translation.service.ts`

All localization data is kept in folder `./src/assets/locale/`
To add new language follow this:

 - Add new `<lang>.json` file to folder `./src/assets/locale/`
 - Add new lang to environments files `./src/environments/environment*.ts`, property `locales`
 - run command in terminal: `npm run update-locale`. this command will check all usages of translation and update all existing *.json files, merge if needed, including newly added file
 
## How it is setup
 - add `./src/assets/locale` folder with JSON files, named by locale name (like `en.json`, or `en-US.json`)
 - setup `TranslateModule` in `app.module.ts`
 - code in `./src/app/services/missing-translation.service.ts`
 - settings in environment.ts files
 - add code to init translation service by calling `this.translateService.use(environment.defaultLocale);` in AppComponent.OnInit
 - additional script `update-locale` in `package.json` to update locale files and add missing keys
