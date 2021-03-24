const preferences = (state = [], action) => {
    switch (action.type) {
      case 'SET_PREFERENCES':
        return action.payload;
      default:
        return state;
    }
  };

// Holds preference options for populating form
// can be found at stpre.preferences  
export default preferences;