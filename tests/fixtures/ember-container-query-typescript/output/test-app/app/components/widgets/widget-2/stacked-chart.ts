import templateOnlyComponent from '@ember/component/template-only';

import type { Data } from '../../../utils/components/widgets/widget-2';

interface WidgetsWidget2StackedChartComponentSignature {
  Args: {
    data: Array<Data>;
  };
}

const WidgetsWidget2StackedChartComponent =
  templateOnlyComponent<WidgetsWidget2StackedChartComponentSignature>();

export default WidgetsWidget2StackedChartComponent;
