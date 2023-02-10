// Types for compiled templates
declare module '@ijlee2/ember-container-query/templates/*' {
  import { TemplateFactory } from 'htmlbars-inline-precompile';
  const tmpl: TemplateFactory;
  export default tmpl;
}
