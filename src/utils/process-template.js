/* https://github.com/ember-cli/ember-cli/blob/v4.9.2/lib/utilities/process-template.js */
import template from 'lodash.template';

export function processTemplate(content, context) {
  const options = {
    escape: /<%-([\s\S]+?)%>/g,
    evaluate: /<%([\s\S]+?)%>/g,
    interpolate: /<%=([\s\S]+?)%>/g,
  };

  return template(content, options)(context);
}
