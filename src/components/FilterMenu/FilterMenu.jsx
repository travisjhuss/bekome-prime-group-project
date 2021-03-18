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
} from '@material-ui/core';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
import FilterListIcon from '@material-ui/icons/FilterList';
import useStyles from '../../hooks/useStyles';

function FilterMenu({ query }) {
  const classes = useStyles();
  const history = useHistory();
  const preferences = useSelector((store) => store.preferences);
  const [drawer, setDrawer] = useState(false);
  const [collapseOpen, setCollapseOpen] = useState(false);

  const { filterIds } = query;

  const handleFilterURL = (id) => {
    let newFilterString = '';
    if (filterIds && filterIds.includes(id)) {
      const newArray = filterIds.filter((item) => item !== id);
      newFilterString = queryString.stringify(
        { filterIds: newArray },
        { arrayFormat: 'bracket' }
      );
    } else {
      newFilterString = queryString.stringify(
        { filterIds: filterIds ? [...filterIds, id] : [id] },
        { arrayFormat: 'bracket' }
      );
    }
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

  const handleCollapseOpen = (category) => {
    collapseOpen === category
      ? setCollapseOpen(false)
      : setCollapseOpen(category);
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
        if (filterIds?.includes(item.id)) {
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
      <Drawer anchor={'left'} open={drawer} onClose={() => setDrawer(false)}>
        <List>
          {categories.sort().map((category, i) => (
            <Box key={i} className={classes.filterDrawer}>
              <ListItem button onClick={() => handleCollapseOpen(category)}>
                <ListItemIcon>
                  {collapseOpen === category ? <ExpandLess /> : <ExpandMore />}
                </ListItemIcon>
                <Typography subtitle="subtitle1">
                  {parseCategory(category)}
                </Typography>
              </ListItem>
              <Collapse in={collapseOpen === category} unmountOnExit>
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
                        onClick={() => handleFilterURL(item.id)}
                        dense
                      >
                        <ListItemIcon>
                          <Checkbox
                            color="primary"
                            disableRipple
                            size="small"
                            checked={filterIds?.includes(item.id)}
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
        </List>
      </Drawer>
    </Box>
  );
}

export default FilterMenu;
