import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import type { Dimensions } from 'ember-container-query/modifiers/container-query';

import type { Image } from 'test-app/data/concert';
import { findBestFittingImage } from 'test-app/utils/components/widgets/widget-3';

interface WidgetsWidget3TourScheduleResponsiveImageComponentSignature {
  Args: {
    images: Array<Image>;
  };
}

export default class WidgetsWidget3TourScheduleResponsiveImageComponent extends Component<WidgetsWidget3TourScheduleResponsiveImageComponentSignature> {
  @tracked imageSource?: string;

  @action setImageSource({ dimensions }: { dimensions: Dimensions }): void {
    const { images } = this.args;

    this.imageSource = findBestFittingImage(images, dimensions);
  }
}
