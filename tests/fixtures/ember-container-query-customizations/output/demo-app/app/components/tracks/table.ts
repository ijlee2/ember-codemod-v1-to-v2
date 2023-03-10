import templateOnlyComponent from '@ember/component/template-only';

import type { Track } from 'demo-app-for-ember-container-query/data/album';

interface TracksTableComponentSignature {
  Args: {
    tracks?: Array<Track>;
  };
}

const TracksTableComponent =
  templateOnlyComponent<TracksTableComponentSignature>();

export default TracksTableComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Tracks::Table': typeof TracksTableComponent;
  }
}
