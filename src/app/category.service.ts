import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private db: AngularFireDatabase) { }

  // tslint:disable-next-line: typedef
  getAll(){
    return this.db.list('/categories/', query => query.orderByChild('name'))
    .snapshotChanges()
    .pipe(
      map((categories: any) =>
        categories.map((c: any) => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }
}
