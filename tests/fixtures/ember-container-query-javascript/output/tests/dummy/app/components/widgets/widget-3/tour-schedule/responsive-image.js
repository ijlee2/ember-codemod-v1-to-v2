import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { findBestFittingImage } from 'dummy/utils/components/widgets/widget-3';

export default class WidgetsWidget3TourScheduleResponsiveImageComponent extends Component {
  @tracked imageSource;

  @action setImageSource({ dimensions }) {
    const { images } = this.args;

    this.imageSource = findBestFittingImage(images, dimensions);
  }
}
