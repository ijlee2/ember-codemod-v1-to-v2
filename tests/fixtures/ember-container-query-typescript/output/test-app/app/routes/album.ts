import Route from '@ember/routing/route';

import type { Album } from 'test-app/data/album';
import albumData from 'test-app/data/album';
import type { ModelFrom } from 'test-app/utils/routes';

export default class AlbumRoute extends Route {
  model(): Album {
    return albumData;
  }
}

export type Model = ModelFrom<AlbumRoute>;
