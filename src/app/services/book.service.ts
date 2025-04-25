import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({ providedIn: 'root' })
export class BookService {
  private api = 'http://localhost:3000/books';
  private booksSubject = new BehaviorSubject<Book[]>([]);
  books$ = this.booksSubject.asObservable();

  constructor(private http: HttpClient) {}

  fetchBooks(): void {
    this.http.get<Book[]>(this.api).subscribe(
      (books) => this.booksSubject.next(books),
      (err) => console.error('Error fetching books', err)
    );
  }

  getBook(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.api}/${id}`);
  }
  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.api, book);
  }

  updateBook(book: Book,id:string): Observable<Book> {
    return this.http.put<Book>(`${this.api}/${id}`, book);
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
