import { Component, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { AlertService } from './services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'rsd-financeiro';

  constructor(protected alertService: AlertService) {
  }

  ngOnInit(): void {
    var splashModal = new bootstrap.Modal(document.getElementById('splashModal')!);
    splashModal.show();
    setTimeout(() => {
      splashModal.hide();
    }, 2600);
  }
}

if (typeof Worker !== 'undefined') {
  // Create a new
  const worker = new Worker(new URL('./app.worker', import.meta.url));
  worker.onmessage = ({ data }) => {
    console.log(`page got message: ${data}`);
  };
  worker.postMessage('hello');
} else {
  // Web Workers are not supported in this environment.
  // You should add a fallback so that your program still executes correctly.
}