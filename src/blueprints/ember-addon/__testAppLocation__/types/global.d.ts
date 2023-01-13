// Types for compiled templates
declare module '<%= options.packages.testApp.name %>/templates/*' {
  import { TemplateFactory } from 'ember-cli-htmlbars';

  const tmpl: TemplateFactory;
  export default tmpl;
}
