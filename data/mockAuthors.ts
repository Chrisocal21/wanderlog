import type { Author } from '@/types';

export const mockAuthors: Author[] = [
  {
    id: 'author-1',
    name: 'Alex Rivers',
    role: 'Photographer & Writer',
    bio: 'Documenting the world one adventure at a time. Based nowhere, exploring everywhere.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    instagram: '@alexrivers',
  },
];

export const getAuthorById = (id: string): Author | undefined => {
  return mockAuthors.find(author => author.id === id);
};
