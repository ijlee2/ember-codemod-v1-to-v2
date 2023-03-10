import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import musicRevenue from 'test-app/data/music-revenue';
import {
  createDataForVisualization,
  createSummariesForCaptions,
} from 'test-app/utils/components/widgets/widget-2';

export default class WidgetsWidget2Component extends Component {
  @tracked data = [];
  @tracked summaries = [];

  constructor(owner, args) {
    super(owner, args);

    this.loadData();
  }

  loadData() {
    this.data = createDataForVisualization(musicRevenue);
    this.summaries = createSummariesForCaptions(this.data);
  }
}
