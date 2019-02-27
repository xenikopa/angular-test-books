import { Observable } from 'rxjs';

import { IBook } from './IBook';

export abstract class IBooksListService {
  public abstract getAllBooks(): Observable<Array<IBook>>;
}
