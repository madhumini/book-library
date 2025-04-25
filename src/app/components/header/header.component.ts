import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  searchTerm = '';
  isGridView = true;

  @Output() search = new EventEmitter<string>();
  @Output() toggle = new EventEmitter<boolean>();

  onSearch() {
    this.search.emit(this.searchTerm);
  }

  toggleView() {
    this.isGridView = !this.isGridView;
    this.toggle.emit(this.isGridView);
  }
}
