import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { BooksRoutingModule } from '@example-app/books/books-routing.module';
import {
  BookAuthorsComponent,
  BookPreviewComponent,
  BookPreviewListComponent,
  BookSearchComponent,
} from '@example-app/books/components';
import { BookDetailComponent } from '@example-app/books/components';
import {
  CollectionPageComponent,
  FindBookPageComponent,
  SelectedBookPageComponent,
  ViewBookPageComponent,
} from '@example-app/books/containers';
import { BookEffects, CollectionEffects } from '@example-app/books/effects';

import * as fromBooks from '@example-app/books/reducers';
import { MaterialModule } from '@example-app/material';
import { PipesModule } from '@example-app/shared/pipes';

export const COMPONENTS = [
  BookAuthorsComponent,
  BookPreviewComponent,
  BookPreviewListComponent,
  BookSearchComponent,
];

export const CONTAINERS = [
  FindBookPageComponent,
  ViewBookPageComponent,
  SelectedBookPageComponent,
  CollectionPageComponent,
];

@NgModule({
  declarations: [CONTAINERS, ...COMPONENTS],
  imports: [
    CommonModule,
    MaterialModule,
    BooksRoutingModule,
    StoreModule.forFeature(fromBooks.booksFeatureKey, fromBooks.reducers),
    EffectsModule.forFeature(BookEffects, CollectionEffects),
    PipesModule,
    BookDetailComponent
  ],
})
export class BooksModule {}
