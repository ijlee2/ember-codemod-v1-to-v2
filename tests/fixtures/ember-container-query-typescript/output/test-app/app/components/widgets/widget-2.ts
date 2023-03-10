import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import musicRevenue from 'test-app/data/music-revenue';
import type { Data, Summary } from 'test-app/utils/components/widgets/widget-2';
import {
  createDataForVisualization,
  createSummariesForCaptions,
} from 'test-app/utils/components/widgets/widget-2';

interface WidgetsWidget2ComponentSignature {}

export default class WidgetsWidget2Component extends Component<WidgetsWidget2ComponentSignature> {
  @tracked data = [] as Array<Data>;
  @tracked summaries = [] as Array<Summary>;

  /* @ts-expect-error Property 'Args' does not exist on type 'WidgetsWidget2ComponentSignature' */
  constructor(owner: unknown, args: WidgetsWidget2ComponentSignature['Args']) {
    super(owner, args);

    this.loadData();
  }

  loadData(): void {
    this.data = createDataForVisualization(musicRevenue);
    this.summaries = createSummariesForCaptions(this.data);
  }
}
