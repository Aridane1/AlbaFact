import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { AlbaranService } from 'src/app/services/albaran.service';

@Component({
  selector: 'app-albaranes',
  templateUrl: './albaranes.page.html',
  styleUrls: ['./albaranes.page.scss'],
})
export class AlbaranesPage implements OnInit {
  albaran: any;
  token: any;
  constructor(private albaranService: AlbaranService) {
    this.token = localStorage.getItem('token');
  }

  ngOnInit() {
    this.changeYear(new Date().getFullYear());
  }

  ionViewWillEnter() {
    this.getAllAlbaranesByUserId();
    this.changeYear(new Date().getFullYear());
  }

  changeYear(year: number) {
    let decode = jwtDecode(this.token) as any;
    let userId = decode.id;
    this.albaranService
      .getAllAlbaranesByYearAndUser(year, userId)
      .subscribe((response) => {
        this.albaran = response;
      });
  }

  getAllAlbaranesByUserId() {
    let decode = jwtDecode(this.token) as any;
    let userId = decode.id;

    this.albaranService
      .getAllAlbaranesByUserId(userId)
      .subscribe((response) => {
        this.albaran = response;
      });
  }
}
