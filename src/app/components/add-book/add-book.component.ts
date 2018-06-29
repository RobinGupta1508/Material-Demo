import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, Validator, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CommonRequestService } from '../../services/common-request.service';
import { Author } from '../../models/author.model';
import { Book } from '../../models/book.model';
import { Chapter } from '../../models/chapter.model';

function validateAuthor(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (control.value === '') {
      return { 'authorValid': true }
    };
    return null;
  }
}

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
	bookForm: FormGroup;
	authorList : Author[] = [];
  bookList : Book[] = [];
  formSubmitFlag = false;
  constructor(private fb: FormBuilder, private _commonRequestService: CommonRequestService, private _router: Router, private _routes: ActivatedRoute) { 
  }

  ngOnInit() {
    const bookList = JSON.parse(localStorage.getItem('BookList'));
    if(bookList){
      this.bookList = bookList;
    }else{
      this.getBookList();  
    }

  	this.bookForm = this.fb.group({
      id: null,
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
			ISBN: ['', [Validators.required]],
			author: [ '' , validateAuthor()],
      publisher: '',
      edition: '',
      publishingDate: '',
      chapters : new FormArray([this.buildChapters()])
		});

    this.getAuthorList();
}

  checkBookExist(){
    const bookId = parseInt(this._router.url.split('/')[2]);
    const book = this.bookList.filter(book => book.id === bookId);
    if(book && book.length>0){
      for(let i=0; i<book[0].chapters.length-1; i++){
        (<FormArray>this.bookForm.get('chapters')).push(this.buildChapters());
      }
      book[0].author = this.authorList.filter(author => author.id === book[0].author.id)[0];
      this.bookForm.setValue(book[0]);
    } 
  }

  buildChapters()  {
    return  this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      startPage: '',
      numberOfPages: ''
    });
  }

  getAuthorList(){
  	this._commonRequestService.getAuthorList().subscribe( data => {
  		this.authorList = data;
      if(this._router.url.split('/')[1] === 'edit'){
        this.checkBookExist()
      }
  	});
  }

  getBookList(){
    this._commonRequestService.getBookList().subscribe( data => {
      this.bookList = data;
      localStorage.setItem('BookList', JSON.stringify(this.bookList));
    });
  }

  addChapter() : void{
    const items = this.bookForm.get('chapters') as FormArray;
    items.push(this.buildChapters());
  }

  saveBook(){
    this.formSubmitFlag = true;
    if(this.bookForm.valid){
      const formData = this.bookForm.value;
      if(formData.id){
         const index = this.bookList.findIndex(book => book.id == formData.id);
         this.bookList.splice(index, 1, formData);
      }else{
        formData.id = this.bookList.length+1;
        this.bookList.push(formData);  
      }      
      localStorage.setItem('BookList', JSON.stringify(this.bookList));
      this.cancel();
    }
  }

  cancel(){
    this.formSubmitFlag = false;
    this.bookForm.reset();
    this._router.navigate(['books']);
  }

  get chapters(): FormGroup {
    return this.bookForm.get('chapters') as FormGroup;
}

}
