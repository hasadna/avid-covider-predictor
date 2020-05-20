import { Component, Inject, LOCALE_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  record: any = {};
  prediction = null;
  direction: string;
  explanationVisible = true;

  constructor(private http: HttpClient, @Inject(LOCALE_ID) private locale) {
    this.direction = locale === 'en' ? 'ltr' : 'rtl';
  }

  send() {
    console.log('sending', this.record);
    this.record = Object.assign({}, this.record);
    this.prediction = null;
    if (this.record.age && this.record.sex && this.record.no_symptoms !== undefined) {
      this.http.post('https://us-central1-hasadna-general.cloudfunctions.net/avid-covider-predictor', this.record)
      .subscribe((result: any) => {
        this.prediction = result.result * 100;
      });
    }
  }

  clear() {
    this.record.temperature = 37;
    this.record.general_feeling = 'feel_good';
    this.record.toplevel_symptoms_cough = false;
    this.record.symptoms_breath_shortness = false;
    this.record.symptoms_smell_taste_loss = false;
    this.record.symptoms_sore_throat = false;
  }
}
