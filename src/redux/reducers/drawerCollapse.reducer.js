const drawerCollapseReducer = (
  state = { collapseOpen: false, drawerOpen: false },
  action
) => {
  switch (action.type) {
    case 'SET_DRAWER':
      return { ...state, drawerOpen: !state.drawerOpen };
    case 'SET_COLLAPSE':
      return {
        ...state,
        collapseOpen:
          state.collapseOpen === action.payload ? false : action.payload,
      };
    default:
      return state;
  }
};

export default drawerCollapseReducer;
