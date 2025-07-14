import { createSelector } from '@ngrx/store';
import { FavoritesState } from './books.reducer';

// Sélecteur d'état favoris (adapter selon ta structure de state globale)
export const selectFavoritesState = (state: any): FavoritesState => state.favorites;

export const isFavoriteBook = (bookId: string) =>
  createSelector(selectFavoritesState, (state: FavoritesState) => !!state.entities[bookId]);
