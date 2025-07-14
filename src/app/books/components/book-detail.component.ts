import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Book } from '@example-app/books/models';
import { BookFavoritesActions } from '../actions/book.actions';
import { isFavoriteBook } from '../reducers/favorites.selectors';

@Component({
  selector: 'bc-book-detail',
  template: `
    <mat-card *ngIf="book">
      <mat-card-title-group>
        <mat-card-title>{{ title }}</mat-card-title>
        <mat-card-subtitle *ngIf="subtitle">{{ subtitle }}</mat-card-subtitle>
        <img mat-card-sm-image *ngIf="thumbnail" [src]="thumbnail" />
      </mat-card-title-group>
      <mat-card-content>
        <p [innerHtml]="description"></p>
      </mat-card-content>
      <mat-card-actions align="start">
        <!-- Toggle Favorite -->
        <button mat-icon-button (click)="toggleFavorite()">
          <mat-icon>
            {{ (isFav$ | async) ? 'star' : 'star_border' }}
          </mat-icon>
        </button>

        <!-- Add/Remove Collection as before -->
        <button
          mat-raised-button
          color="warn"
          *ngIf="inCollection"
          (click)="remove.emit(book)"
        >
          Remove Book from Collection
        </button>

        <button
          mat-raised-button
          color="primary"
          *ngIf="!inCollection"
          (click)="add.emit(book)"
        >
          Add Book to Collection
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [ /* existing styles */ ],
})
export class BookDetailComponent implements OnInit {
  @Input() book!: Book;
  @Input() inCollection!: boolean;
  @Output() add = new EventEmitter<Book>();
  @Output() remove = new EventEmitter<Book>();

  isFav$!: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.isFav$ = this.store.select(isFavoriteBook(this.book.id));
  }

  toggleFavorite() {
    this.isFav$.pipe(take(1)).subscribe(isFav => {
      if (isFav) {
        this.store.dispatch(
          BookFavoritesActions.removeFromFavorites({ bookId: this.book.id })
        );
      } else {
        this.store.dispatch(
          BookFavoritesActions.addToFavorites({ book: this.book })
        );
      }
    });
  }
}