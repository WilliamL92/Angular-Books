import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromBooks from '../reducers/books.reducer';

export const selectBooksState = createFeatureSelector<fromBooks.State>('books');

export const selectFavorites = createSelector(
  selectBooksState,
  (state) => state.favorites ?? []
);

export const isFavoriteBook = (bookId: string) => createSelector(
  selectFavorites,
  (favorites) => (favorites ?? []).includes(bookId)
);