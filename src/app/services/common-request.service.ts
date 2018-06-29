import { Inject, Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class CommonRequestService {
	
	constructor(private http: Http){}

	 getAuthorList(): Observable<any[]> {
		return this.http.get('../../assets/data/authors.json').map(res => res.json());
  }




  getBookList(): Observable<any[]> {
		return this.http.get('../../assets/data/books.json').map(res => res.json());
  }

	 

}