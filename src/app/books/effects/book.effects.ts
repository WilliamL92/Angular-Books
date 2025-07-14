import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { asyncScheduler, EMPTY as empty, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  map,
  mergeMap,
  skip,
  switchMap,
  takeUntil,
} from 'rxjs/operators';
import { Book } from '@example-app/books/models';
import { BooksApiActions } from '@example-app/books/actions/books-api.actions';
import { FindBookPageActions } from '@example-app/books/actions/find-book-page.actions';
import * as BookFavoritesActions from './book-favorites.actions';
import { GoogleBooksService } from '@example-app/core/services/google-books.service';
import { StorageService } from '@example-app/core/services/book-storage.service';

@Injectable()
export class BookEffects {
  // Recherche de livres
  search$ = createEffect(
    () =>
      ({ debounce = 300, scheduler = asyncScheduler } = {}) =>
        this.actions$.pipe(
          ofType(FindBookPageActions.searchBooks),
          debounceTime(debounce, scheduler),
          switchMap(({ query }) => {
            if (!query.trim()) {
              return empty;
            }
            const nextSearch$ = this.actions$.pipe(
              ofType(FindBookPageActions.searchBooks),
              skip(1)
            );
            return this.googleBooks.searchBooks(query).pipe(
              takeUntil(nextSearch$),
              map((books: Book[]) => BooksApiActions.searchSuccess({ books })),
              catchError(err => of(BooksApiActions.searchFailure({ errorMsg: err.message })))
            );
          })
  );

  // Add to favorites
  addFav$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookFavoritesActions.addToFavorites),
      mergeMap(({ book }) =>
        this.storageService.addToFavorites(book).pipe(
          map(() => BookFavoritesActions.addToFavoritesSuccess({ book })),
          catchError(error => of(BookFavoritesActions.addToFavoritesFailure({ error })))
        )
      )
    )
  );

  // Remove from favorites
  removeFav$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookFavoritesActions.removeFromFavorites),
      mergeMap(({ bookId }) =>
        this.storageService.removeFromFavorites(bookId).pipe(
          map(() => BookFavoritesActions.removeFromFavoritesSuccess({ bookId })),
          catchError(error => of(BookFavoritesActions.removeFromFavoritesFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private googleBooks: GoogleBooksService,
    private storageService: StorageService
  ) {}
}