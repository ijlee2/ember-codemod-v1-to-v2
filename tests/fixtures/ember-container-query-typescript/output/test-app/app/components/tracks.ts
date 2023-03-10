import templateOnlyComponent from '@ember/component/template-only';

import type { Track } from 'test-app/data/album';

interface TracksComponentSignature {
  Args: {
    tracks?: Array<Track>;
  };
}

const TracksComponent = templateOnlyComponent<TracksComponentSignature>();

export default TracksComponent;
