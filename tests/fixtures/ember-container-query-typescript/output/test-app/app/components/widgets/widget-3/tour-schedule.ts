import templateOnlyComponent from '@ember/component/template-only';

import type { Concert } from 'test-app/data/concert';

export interface WidgetsWidget3TourScheduleComponentSignature {
  Args: {
    concert: Concert;
  };
}

const WidgetsWidget3TourScheduleComponent =
  templateOnlyComponent<WidgetsWidget3TourScheduleComponentSignature>();

export default WidgetsWidget3TourScheduleComponent;
