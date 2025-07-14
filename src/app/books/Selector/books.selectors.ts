import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromFavorites from '../reducers/books.reducer';

// Feature selector
export const selectFavoritesState = createFeatureSelector<fromFavorites.FavoritesState>(
  fromFavorites.favoritesFeatureKey
);

// Re-exports from Entity
export const selectAllFavoriteBooks = createSelector(
  selectFavoritesState,
  fromFavorites.selectAll
);
export const selectFavoriteEntities = createSelector(
  selectFavoritesState,
  fromFavorites.selectEntities
);

// Is favorite
export const isFavoriteBook = (bookId: string) => createSelector(
  selectFavoriteEntities,
  (entities) => !!entities[bookId]
);