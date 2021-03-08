// Holds preference options for populating form
const preferences = (state = [], action) => {
    switch (action.type) {
      case 'SET_PREFERENCES':
        return action.payload;
      default:
        return state;
    }
  };

export default preferences;