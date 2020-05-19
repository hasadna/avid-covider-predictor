import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  record: any = {};
  prediction = null;

  constructor(private http: HttpClient) {
  }

  send() {
    console.log('sending', this.record);
    this.record = Object.assign({}, this.record);
    this.prediction = null;
    if (this.record.age && this.record.sex) {
      this.http.post('https://us-central1-hasadna-general.cloudfunctions.net/avid-covider-predictor', this.record)
      .subscribe((result: any) => {
        this.prediction = result.result * 100;
      });
    }
  }
}
