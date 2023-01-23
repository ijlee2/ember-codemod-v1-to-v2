/* https://github.com/ember-cli/ember-cli/blob/v4.9.2/lib/utilities/process-template.js */
import template from 'lodash.template';

export function processTemplate(file, data) {
  const settings = {
    escape: /<%-([\s\S]+?)%>/g,
    evaluate: /<%([\s\S]+?)%>/g,
    interpolate: /<%=([\s\S]+?)%>/g,
  };

  return template(file, settings)(data);
}
