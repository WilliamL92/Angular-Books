import { createActionGroup, props } from '@ngrx/store';
import { Book } from '@example-app/books/models';

export const BookFavoritesActions = createActionGroup({
  source: 'Book Favorites',
  events: {
    'Add Book To Favorites': props<{ book: Book }>(),
    'Add Book To Favorites Success': props<{ book: Book }>(),
    'Add Book To Favorites Failure': props<{ error: any }>(),

    'Remove Book From Favorites': props<{ book: Book }>(),
    'Remove Book From Favorites Success': props<{ book: Book }>(),
    'Remove Book From Favorites Failure': props<{ error: any }>(),
  }
});