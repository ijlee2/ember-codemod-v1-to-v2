import templateOnlyComponent from '@ember/component/template-only';

import type { Track } from 'test-app/data/album';

interface TracksTableComponentSignature {
  Args: {
    tracks?: Array<Track>;
  };
}

const TracksTableComponent =
  templateOnlyComponent<TracksTableComponentSignature>();

export default TracksTableComponent;
