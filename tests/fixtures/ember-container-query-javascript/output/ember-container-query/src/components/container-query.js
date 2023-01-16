import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class ContainerQueryComponent extends Component {
  @tracked dimensions;
  @tracked queryResults;

  // The dynamic tag is restricted to be immutable
  tagName = this.args.tagName ?? 'div';

  @action updateState({ dimensions, queryResults }) {
    this.dimensions = dimensions;
    this.queryResults = queryResults;
  }
}
