import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AlbaranService } from 'src/app/services/albaran.service';

@Component({
  selector: 'app-year-button',
  templateUrl: './year-button.component.html',
  styleUrls: ['./year-button.component.scss'],
})
export class YearButtonComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  selectedYear: number = this.currentYear;
  availableYears: any = [];
  @Output() year = new EventEmitter<any>();
  constructor(private albaranService: AlbaranService) {}

  ngOnInit() {
    this.loadAvailableYears();
  }

  onSelectYear(year: number): void {
    this.selectedYear = year;
    this.year.emit(year);
  }

  private loadAvailableYears(): void {
    this.albaranService.getDistinctYear().subscribe((data) => {
      this.availableYears = data;
    });
  }
}
