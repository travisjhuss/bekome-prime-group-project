const providerDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_PROVIDER_DETAILS':
      return action.payload;
    default:
      return state;
  }
}

// Holds information for one provider, displayed on ProviderDetails
// can be found at store.providerDetails
export default providerDetailsReducer;