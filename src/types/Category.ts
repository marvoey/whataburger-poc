import type { ContentReference, Link } from '../../__generated/graphql/graphql';

export type Category = {
  /** Display name — rendered as <h4> in the category card */
  Name: string;
  /** Thumbnail image */
  Asset: ContentReference;
};
