import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Menu,
  Button,
  ListItemIcon,
  MenuItem,
  withStyles,
  Checkbox,
  Chip,
  Typography,
} from '@material-ui/core';
import NestedMenuItem from 'material-ui-nested-menu-item';
import FilterListIcon from '@material-ui/icons/FilterList';
import useStyles from '../../hooks/useStyles';

// creates and styles a custom Menu
const StyledBaseMenu = withStyles({
  paper: {
    backgroundColor: '#e0fbfc',
    color: '#3D5A80',
  },
})((props) => (
  <Menu
    elevation={1}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
    }}
    {...props}
  />
));

function FilterMenu({ handleFilterURL, filterArray }) {
  const classes = useStyles();
  const preferences = useSelector((store) => store.preferences);
  const [anchorEl, setAnchorEl] = useState(null);

  const categories = [];
  preferences.forEach((item) => {
    if (!categories.includes(item.category) && item.category !== 'pronouns') {
      categories.push(item.category);
    }
  });

  const parseCategory = (string) => {
    return string
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <>
      <Button
        startIcon={<FilterListIcon/>}
        color="primary"
        className={classes.filterButton}
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        <Typography variant="subtitle1">Filters</Typography>
      </Button>
      {preferences.map((item) => {
        if (filterArray?.includes(item.id)) {
          return (
            <Chip
              key={item.id}
              className={classes.chips}
              label={item.name}
              color="primary"
              onDelete={() => handleFilterURL(item.id)}
            />
          );
        }
      })}
      <StyledBaseMenu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {categories.sort().map((category, i) => (
          <NestedMenuItem
            key={i}
            onClick={() => setAnchorEl(null)}
            parentMenuOpen={Boolean(anchorEl)}
            label={
              <Typography variant="subtitle2">
                {parseCategory(category)}
              </Typography>
            }
          >
            {preferences.map((item) => {
              if (
                item.category === category &&
                item.name !== 'Prefer not to respond'
              ) {
                return (
                  <MenuItem
                    key={item.id}
                    onClick={() => handleFilterURL(item.id)}
                    dense
                  >
                    <ListItemIcon>
                      <Checkbox
                        color="primary"
                        disableRipple
                        size="small"
                        checked={filterArray?.includes(item.id)}
                      />
                    </ListItemIcon>
                    <Typography variant="subtitle2">{item.name}</Typography>
                  </MenuItem>
                );
              }
            })}
          </NestedMenuItem>
        ))}
      </StyledBaseMenu>
    </>
  );
}

export default FilterMenu;
