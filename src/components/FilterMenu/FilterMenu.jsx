import { useState } from 'react';
import { useSelector } from 'react-redux';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
import {
  Button,
  ListItemIcon,
  Checkbox,
  Chip,
  Typography,
  Drawer,
  List,
  ListItem,
  Collapse,
  Box,
  Switch,
  FormControlLabel,
} from '@material-ui/core';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
import FilterListIcon from '@material-ui/icons/FilterList';
import useStyles from '../../hooks/useStyles';

function FilterMenu({ query }) {
  const classes = useStyles();
  const history = useHistory();
  const preferences = useSelector((store) => store.preferences);
  const {
    filterIds,
    states,
    booleans,
    collapseOnRefresh,
    drawerOnRefresh,
  } = query;
  const [drawer, setDrawer] = useState(false);
  const [collapse, setCollapse] = useState(false);

  const handleFilterArray = (value, key) => {
    const array =
      key === 'filterIds' ? filterIds : key === 'states' ? states : booleans;
    const newFilterArray =
      array && array.includes(value)
        ? array.filter((item) => item !== value)
        : array
        ? [...array, value]
        : [value];
    const newFilterString = queryString.stringify(
      {
        ...query,
        [key]: newFilterArray,
        drawerOnRefresh: drawer,
        collapseOnRefresh: collapse,
      },
      { arrayFormat: 'bracket' }
    );
    history.push(`/explore/?${newFilterString}`);
  };

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

  const handleCollapse = (category) => {
    collapse === category ? setCollapse(false) : setCollapse(category);
  };

  const handleCollapseOpen = (category) => {
    if (collapseOnRefresh && collapseOnRefresh === category) {
      delete query.collapseOnRefresh;
      setCollapse(category);
      return true;
    } else if (collapse && collapse === category) {
      return true;
    } else {
      return false;
    }
  };

  const handleDrawerClose = () => {
    if (drawerOnRefresh) {
      delete query.drawerOnRefresh;
      setDrawer(false);
    } else {
      setDrawer(false);
    }
  };

  return (
    <Box>
      <Button
        startIcon={<FilterListIcon />}
        color="primary"
        className={classes.filterButton}
        onClick={() => setDrawer(true)}
      >
        <Typography variant="subtitle1">Filters</Typography>
      </Button>
      {preferences.map((item) => {
        if (filterIds?.includes(item.id) || states?.includes(item.name)) {
          return (
            <Chip
              key={item.id}
              className={classes.chips}
              label={item.name}
              color="primary"
              onDelete={() => {
                item.category === 'states'
                  ? handleFilterArray(item.name, 'states')
                  : handleFilterArray(item.id, 'filterIds');
              }}
            />
          );
        }
      })}
      {booleans?.map((item, i) => (
        <Chip
          key={i}
          className={classes.chips}
          label={item}
          color="primary"
          onDelete={() => handleFilterArray(item, 'booleans')}
        />
      ))}

      <Drawer
        BackdropProps={{ invisible: true }}
        anchor={'left'}
        open={drawerOnRefresh || drawer}
        onClose={handleDrawerClose}
      >
        <List>
          {categories.sort().map((category, i) => (
            <Box key={i} className={classes.filterDrawer}>
              <ListItem button onClick={() => handleCollapse(category)}>
                <ListItemIcon>
                  {collapse === category ? <ExpandLess /> : <ExpandMore />}
                </ListItemIcon>
                <Typography subtitle="subtitle1">
                  {parseCategory(category)}
                </Typography>
              </ListItem>
              <Collapse in={handleCollapseOpen(category)} unmountOnExit>
                {preferences.map((item) => {
                  if (
                    item.category === category &&
                    item.name !== 'Prefer not to respond'
                  ) {
                    return (
                      <ListItem
                        className={classes.filterListItem}
                        key={item.id}
                        button
                        onClick={() => {
                          category === 'states'
                            ? handleFilterArray(item.name, 'states')
                            : handleFilterArray(item.id, 'filterIds');
                        }}
                        dense
                      >
                        <ListItemIcon>
                          <Checkbox
                            color="primary"
                            disableRipple
                            size="small"
                            checked={
                              filterIds?.includes(item.id) ||
                              states?.includes(item.name)
                            }
                          />
                        </ListItemIcon>
                        <Typography variant="body2">{item.name}</Typography>
                      </ListItem>
                    );
                  }
                })}
              </Collapse>
            </Box>
          ))}
          <Box px={2} paddingTop={2}>
            <FormControlLabel
              className={classes.filterSwitches}
              control={
                <Switch
                  checked={booleans?.includes('Accepting Clients')}
                  onClick={() =>
                    handleFilterArray('Accepting Clients', 'booleans')
                  }
                />
              }
              label={
                <Typography variant="body2">Accepting New Clients</Typography>
              }
            />
          </Box>
          <Box px={2}>
            <FormControlLabel
              className={classes.filterSwitches}
              control={
                <Switch
                  checked={booleans?.includes('Sliding Scale')}
                  onClick={() => handleFilterArray('Sliding Scale', 'booleans')}
                />
              }
              label={
                <Typography variant="body2">Sliding Scale Payments</Typography>
              }
            />
          </Box>
        </List>
      </Drawer>
    </Box>
  );
}

export default FilterMenu;
