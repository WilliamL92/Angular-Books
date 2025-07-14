export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    subtitle: string;
    authors: string[];
    publisher: string;
    publishDate: string;
    description: string;
    averageRating: number;
    ratingsCount: number;
    isFavoris: boolean;
    imageLinks: {
      thumbnail: string;
      smallThumbnail: string;
    };
  };
}

export function generateMockBook(): Book {
  return {
    id: '1',
    volumeInfo: {
      title: 'title',
      subtitle: 'subtitle',
      authors: ['author'],
      publisher: 'publisher',
      publishDate: '',
      description: 'description',
      averageRating: 3,
      ratingsCount: 5,
      isFavoris: false,
      imageLinks: {
        thumbnail: 'string',
        smallThumbnail: 'string',
      },
    },
  };
}
