import { Component, OnInit } from '@angular/core';
import { CommonRequestService } from '../../services/common-request.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Book } from '../../models/book.model';
import { BookDetailDialogComponent } from '../book-detail-dialog/book-detail-dialog.component';
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  bookList: Book[];
  searchText: string;
  constructor(private _commonRequestService: CommonRequestService, public dialog: MatDialog) { }

  ngOnInit() {
    const bookList = JSON.parse(localStorage.getItem('BookList'));
    if (bookList) {
      this.bookList = bookList;
    } else {
      this.getBookListFormJson();
    }
  }

  getBookListFormJson() {
    this._commonRequestService.getBookList().subscribe(data => {
      this.bookList = data;
      localStorage.setItem('BookList', JSON.stringify(this.bookList));
    })
  }

  deleteBook(index) {
    this.bookList.splice(index, 1);
    localStorage.setItem('BookList', JSON.stringify(this.bookList));
  }

  openDialog(book): void {
    let dialogRef = this.dialog.open(BookDetailDialogComponent, {
      width: '500px',
      data: book
    });
  }
}
