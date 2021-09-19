import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject
} from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FireBaseService {
  constructor(public db: AngularFireDatabase) {}

  list<T>(path: string): AngularFireList<T> {
    return this.db.list(path);
  }

  add<T>(path: string, data: T): void {
    this.list(path).push(data);
  }

  getList<T>(path: string): Observable<T> {
    return this.list(path)
      .snapshotChanges()
      .pipe(
        map((changes: any) =>
          changes.map((c: any) => {
            return {
              key: c.payload.key,
              ...<T>c.payload.val()
            };
          })
        )
      );
  }

  object<T>(path: string): AngularFireObject<T> {
    return this.db.object(path)
  }

  getObject(path: string): Observable<any> {
    return this.object(path).valueChanges()
  }

  delete(path: string, key: string): Promise<void> {
    return this.list(path).remove(key);
  }

  update<T>(path: string, key: string, data: T) {
    return this.list(path).update(key, data);
  }
}
