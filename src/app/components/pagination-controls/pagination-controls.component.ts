import { Component, EventEmitter, Output } from '@angular/core';
import { PaginationService } from 'src/app/services/pagination.service';

@Component({
  selector: 'app-pagination-controls',
  template: `
    <div class="pagination" *ngIf="!isSinglePage()">
      <app-pagination-arrow
        class="pagination__prev"
        (click)="onPrevClick()"
        [enabled]="!isFirstPage()"
      ></app-pagination-arrow>
      <span class="pagination__current-page">{{ currentPage }}</span>
      <app-pagination-arrow
        class="pagination__next"
        (click)="onNextClick()"
        [enabled]="!isLastPage()"
        direction="right"
      ></app-pagination-arrow>
    </div>
  `,
  styleUrls: ['./pagination-controls.component.scss'],
})
export class PaginationControlsComponent {
  currentPage: number;

  @Output() changePage = new EventEmitter();

  constructor(private paginationService: PaginationService) {
    this.paginationService.pageChange.subscribe((page) => {
      this.currentPage = page;
    });
  }

  onPrevClick() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }

    this.changePage.emit(this.currentPage);
  }

  onNextClick() {
    if (this.currentPage < this.paginationService.getTotalPages()) {
      this.currentPage++;
    }

    this.changePage.emit(this.currentPage);
  }

  isFirstPage(): boolean {
    return this.currentPage === 1;
  }

  isLastPage(): boolean {
    return this.currentPage === this.paginationService.getTotalPages();
  }

  isSinglePage(): boolean {
    return this.paginationService.getTotalPages() === 1;
  }
}
