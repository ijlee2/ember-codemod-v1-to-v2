import { deprecate } from '@ember/debug';

import HeightHelper from 'ember-container-query/helpers/height';

deprecate(
  'The {{cq-height}} helper has been renamed to {{height}}. Please update the helper name in your template.',
  false,
  {
    for: 'ember-container-query',
    id: 'ember-container-query.rename-cq-height-helper',
    since: {
      available: '3.2.0',
      enabled: '3.2.0',
    },
    until: '4.0.0',
    url: 'https://github.com/ijlee2/ember-container-query/tree/3.2.0#api',
  }
);

export default HeightHelper;
