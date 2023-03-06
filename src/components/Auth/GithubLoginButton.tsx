// Hooks
// Components
// Styles
// Utils

// Props type defination
interface Props {}

// Default props
const defaultProps: Props = {};

/**
 * Github Login Button
 */
const GithubLoginButton = ({}: Props) => {
  const url = "/oauth/login";

  return (
    <a role="button" href={url}>
      Github Login
    </a>
  );
};

GithubLoginButton.defaultProps = defaultProps;

export default GithubLoginButton;
