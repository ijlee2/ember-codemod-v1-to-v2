import { registerDestructor } from '@ember/destroyable';
import { action } from '@ember/object';
import { debounce as _debounce } from '@ember/runloop';
import { inject as service } from '@ember/service';
import Modifier from 'ember-modifier';

export default class ContainerQueryModifier extends Modifier {
  @service resizeObserver;

  dimensions;
  queryResults;

  _dataAttributes = [];
  _element;
  _named;

  get dataAttributePrefix() {
    return this._named.dataAttributePrefix ?? 'container-query';
  }

  get debounce() {
    return this._named.debounce ?? 0;
  }

  get features() {
    return this._named.features ?? {};
  }

  constructor(owner, args) {
    super(owner, args);

    registerDestructor(this, () => {
      this.resizeObserver.unobserve(this._element, this.onResize);
    });
  }

  modify(element, _positional, named) {
    this._named = named;

    this.registerResizeObserver(element);
    this.queryContainer(element);
  }

  @action onResize(resizeObserverEntry) {
    const element = resizeObserverEntry.target;

    if (this.debounce > 0) {
      _debounce(this, this.queryContainer, element, this.debounce);
      return;
    }

    this.queryContainer(element);
  }

  registerResizeObserver(element) {
    this.resizeObserver.unobserve(this._element, this.onResize);

    this._element = element;
    this.resizeObserver.observe(this._element, this.onResize);
  }

  queryContainer(element) {
    this.measureDimensions(element);
    this.evaluateQueries();
    this.resetDataAttributes(element);
    this.setDataAttributes(element);

    this._named.onQuery?.({
      dimensions: this.dimensions,
      queryResults: this.queryResults,
    });
  }

  measureDimensions(element) {
    const height = element.clientHeight;
    const width = element.clientWidth;

    this.dimensions = {
      aspectRatio: width / height,
      height,
      width,
    };
  }

  evaluateQueries() {
    const queryResults = {};

    for (const [featureName, metadata] of Object.entries(this.features)) {
      const { dimension, min, max } = metadata;
      const value = this.dimensions[dimension];

      queryResults[featureName] = min <= value && value < max;
    }

    this.queryResults = queryResults;
  }

  resetDataAttributes(element) {
    this._dataAttributes.forEach((dataAttribute) => {
      element.removeAttribute(dataAttribute);
    });

    this._dataAttributes = [];
  }

  setDataAttributes(element) {
    const prefix = this.dataAttributePrefix;

    for (const [featureName, meetsFeature] of Object.entries(
      this.queryResults
    )) {
      if (!meetsFeature) {
        continue;
      }

      const dataAttribute = prefix
        ? `data-${prefix}-${String(featureName)}`
        : `data-${String(featureName)}`;

      element.setAttribute(dataAttribute, '');

      this._dataAttributes.push(dataAttribute);
    }
  }
}
