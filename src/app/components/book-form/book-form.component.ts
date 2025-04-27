import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
})
export class BookFormComponent implements OnInit {
  bookForm!: FormGroup;
  id!: string;
  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      cover: ['', Validators.required],
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      category: ['', Validators.required],
    });
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id')!;

      if (this.id) {
        this.bookService.getBook(this.id).subscribe((res) => {
          console.log(res);
          this.bookForm.patchValue({
            title: res?.title,
            author: res?.author,
            cover: res?.cover,
            rating: res?.rating,
            category: res?.category,
          });
        });
      }
    });
  }

  Submit() {
    if (this.id !== null || undefined) {
      const formValue = { ...this.bookForm.value, id: parseInt(this.id) };

      if (this.bookForm.valid) {
        this.bookService.updateBook(formValue, this.id).subscribe((res) => {
          this.router.navigate(['']);
        });
      } else {
        this.bookForm.markAllAsTouched();
      }
    } else {
      const formValue = { ...this.bookForm.value };
      delete formValue.id; // Ensure we don't send an id

      console.log(formValue);
      this.bookService.addBook(formValue).subscribe((res) => {
        this.router.navigate(['']);
      });
    }
  }
  cancel() {
    this.router.navigate(['']);
  }
}
