import { useHistory } from 'react-router-dom';
import { Typography, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import StarOutlineIcon from '@material-ui/icons/StarOutline';

function NavClient() {
  const history = useHistory();
  return (
    <>
      <Button
        startIcon={<SearchIcon />}
        color="secondary"
        onClick={() => history.push('/explore')}
      >
        <Typography variant="subtitle1" color="primary">
          Explore Providers
        </Typography>
      </Button>
      <Button
        startIcon={<StarOutlineIcon />}
        color="secondary"
        onClick={() => history.push('/about')}
      >
        <Typography variant="subtitle1" color="primary">
          Saved Providers
        </Typography>
      </Button>
    </>
  );
}

export default NavClient;
