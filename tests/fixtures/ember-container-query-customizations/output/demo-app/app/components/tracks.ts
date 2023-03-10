import templateOnlyComponent from '@ember/component/template-only';

import type { Track } from 'demo-app-for-ember-container-query/data/album';

interface TracksComponentSignature {
  Args: {
    tracks?: Array<Track>;
  };
}

const TracksComponent = templateOnlyComponent<TracksComponentSignature>();

export default TracksComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    Tracks: typeof TracksComponent;
  }
}
