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
  const url = `https://github.com/login/oauth/authorize?client_id=${
    import.meta.env.VITE_GITHUB_OAUTH_CLIENT_ID
  }&redirect_uri=${import.meta.env.VITE_GITHUUB_OAUTH_REDIRECT_URI}&scope=repo`;

  return (
    <a role="button" href={url}>
      hello world
    </a>
  );
};

GithubLoginButton.defaultProps = defaultProps;

export default GithubLoginButton;
