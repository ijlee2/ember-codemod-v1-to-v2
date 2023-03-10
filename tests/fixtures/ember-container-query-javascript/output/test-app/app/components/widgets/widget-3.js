import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import concertData from 'test-app/data/concert';

export default class WidgetsWidget3Component extends Component {
  @tracked concertData = {};

  constructor(owner, args) {
    super(owner, args);

    this.loadData();
  }

  loadData() {
    this.concertData = concertData;
  }
}
