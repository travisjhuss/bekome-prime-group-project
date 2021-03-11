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
        color="primary"
        onClick={() => history.push('/explore')}
      >
        <Typography color="primary">Explore Providers</Typography>
      </Button>
      <Button
        startIcon={<StarOutlineIcon />}
        color="primary"
        onClick={() => history.push('/about')}
      >
        <Typography color="primary">Saved Providers</Typography>
      </Button>
    </>
  );
}

export default NavClient;
