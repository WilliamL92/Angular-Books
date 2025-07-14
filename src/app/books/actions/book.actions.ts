import { createActionGroup, props } from '@ngrx/store';

import { Book } from '@example-app/books/models';

export const BookActions = createActionGroup({
  source: 'Book Exists Guard',
  events: {
    'Load Book': props<{ book: Book }>(),
  },
});

export const FavoriteActions = createActionGroup({
  source: 'Book Favorite',
  events: {
    'Add Favorite': props<{ bookId: string }>(),
    'Remove Favorite': props<{ bookId: string }>(),
  },
});