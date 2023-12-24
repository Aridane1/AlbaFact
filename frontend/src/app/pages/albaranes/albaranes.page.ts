import { Component, OnInit } from '@angular/core';
import { AlbaranService } from 'src/app/services/albaran.service';

@Component({
  selector: 'app-albaranes',
  templateUrl: './albaranes.page.html',
  styleUrls: ['./albaranes.page.scss'],
})
export class AlbaranesPage implements OnInit {
  constructor(private albaranService: AlbaranService) {}
  albaran: any;

  ngOnInit() {
    this.changeYear(new Date().getFullYear());
  }

  ionViewWillEnter() {
    this.getAllAlbaranes();
    this.changeYear(new Date().getFullYear());
  }

  changeYear(year: number) {
    this.albaranService.getAllAlbaranesByYear(year).subscribe((response) => {
      this.albaran = response;
    });
  }

  getAllAlbaranes() {
    this.albaranService.getAllAlbaranes().subscribe((response) => {
      this.albaran = response;
    });
  }
}
