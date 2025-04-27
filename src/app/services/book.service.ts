import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({ providedIn: 'root' })
export class BookService {
  private api = 'http://localhost:3000/books';

  constructor(private http: HttpClient) {}

  fetchBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.api);
  }

  getBook(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.api}/${id}`);
  }
  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.api, book);
  }

  updateBook(book: Book, id: string): Observable<Book> {
    return this.http.put<Book>(`${this.api}/${id}`, book);
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
