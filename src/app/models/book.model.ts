import { Author } from './author.model';
import { Chapter } from './chapter.model';
export class Book {
	public id = null;
    public title = '';
    public ISBN = '';
    public author: Author = new Author();
    public publisher: '';
    public edition : '';
    public publishingDate: '';
    public chapters : Chapter[] = [new Chapter()];
    constructor() { }
}
