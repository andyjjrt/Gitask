// Hooks
// Components
// Styles
// Utils

// Props type defination
interface Props{}

// Default props
const defaultProps: Props = {};

/**
 * Component description.
 *
 * @param test- Test description
 * 
 */
const SampleComponent = ({}: Props) => {
  return (<p>hello world</p>)
};

SampleComponent.defaultProps = defaultProps;

export default SampleComponent;