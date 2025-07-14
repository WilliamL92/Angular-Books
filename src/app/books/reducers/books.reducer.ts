// Export reducer sous le nom générique pour NgRx
export const reducer = favoritesReducer;
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Book } from '@example-app/books/models';
import { BookFavoritesActions } from '../actions/book.actions';

// Clé feature
export const favoritesFeatureKey = 'favorites';

// 1️⃣ EntityState pour Books
export interface FavoritesState extends EntityState<Book> {
  error: any | null;
}

// 2️⃣ Adapter config
export const adapter: EntityAdapter<Book> = createEntityAdapter<Book>({
  selectId: (book: Book) => book.id,
  sortComparer: false
});

// 3️⃣ Initial State
export const initialState: FavoritesState = adapter.getInitialState({
  error: null
});

// 4️⃣ Reducer
export const favoritesReducer = createReducer(
  initialState,

  // Add
  on(BookFavoritesActions.addToFavorites,   (state) => ({ ...state, error: null })),
  on(BookFavoritesActions.addToFavoritesSuccess, (state, { book }) =>
    adapter.addOne(book, state)
  ),
  on(BookFavoritesActions.addToFavoritesFailure, (state, { error }) => ({
    ...state,
    error
  })),

  // Remove
  on(BookFavoritesActions.removeFromFavorites,   (state) => ({ ...state, error: null })),
  on(BookFavoritesActions.removeFromFavoritesSuccess, (state, { bookId }) =>
    adapter.removeOne(bookId, state)
  ),
  on(BookFavoritesActions.removeFromFavoritesFailure, (state, { error }) => ({
    ...state,
    error
  }))
);

// 5️⃣ Entity selectors
export const {
  selectId,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();