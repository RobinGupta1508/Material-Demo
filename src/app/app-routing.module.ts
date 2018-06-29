import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookListComponent } from './components/book-list/book-list.component';
import { AddBookComponent } from './components/add-book/add-book.component';
const appRoutes: Routes = [{
  'path': '',
  'redirectTo': 'books',
  'pathMatch': 'prefix'
}, {
  'path': 'books',
  'component': BookListComponent
}, {
  'path': 'add',
  'component': AddBookComponent
},{
  'path': 'edit/:id',
  'component': AddBookComponent
}]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
