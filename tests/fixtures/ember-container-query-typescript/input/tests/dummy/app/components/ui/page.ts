import templateOnlyComponent from '@ember/component/template-only';

export interface UiPageComponentSignature {
  Args: {
    title: string;
  };
  Blocks: {
    default: [];
  };
}

const UiPageComponent = templateOnlyComponent<UiPageComponentSignature>();

export default UiPageComponent;
