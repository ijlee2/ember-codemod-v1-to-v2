import Route from '@ember/routing/route';

import type { Album } from 'demo-app-for-ember-container-query/data/album';
import albumData from 'demo-app-for-ember-container-query/data/album';
import type { ModelFrom } from 'demo-app-for-ember-container-query/utils/routes';

export default class AlbumRoute extends Route {
  model(): Album {
    return albumData;
  }
}

export type Model = ModelFrom<AlbumRoute>;
