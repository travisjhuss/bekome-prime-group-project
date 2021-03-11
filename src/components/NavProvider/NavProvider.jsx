import { useHistory } from 'react-router-dom';
import { Typography, Button } from '@material-ui/core';
import StarOutlineIcon from '@material-ui/icons/StarOutline';

function NavProvider() {
  const history = useHistory();
  return (
    <>
      <Button
        startIcon={<StarOutlineIcon />}
        color="secondary"
        onClick={() => history.push('/about')}
      >
        <Typography variant="subtitle1" color="primary">
          Client Matches
        </Typography>
      </Button>
    </>
  );
}

export default NavProvider;
