import Route from '@ember/routing/route';
import albumData from '../data/album';

export default class AlbumRoute extends Route {
  model() {
    return albumData;
  }
}
