import { Component, Input, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  filteredBooks: Book[] = [];
  @Input() isGridView = true;

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookService.books$.subscribe((books) => {
      this.books = books;
      this.filteredBooks = books;
    });
    this.bookService.fetchBooks();
  }

  onSearch(term: string) {
    this.filteredBooks = this.books.filter(
      (b) =>
        b.title.toLowerCase().includes(term.toLowerCase()) ||
        b.author.toLowerCase().includes(term.toLowerCase())
    );
  }

  deleteBook(id: number) {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService
        .deleteBook(id)
        .subscribe(() => this.bookService.fetchBooks());
    }
  }
}
