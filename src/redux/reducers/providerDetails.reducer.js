// Holds information for one provider, displayed on ProviderDetails
const providerDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_PROVIDER_DETAILS':
      return action.payload;
    default:
      return state;
  }
}

export default providerDetailsReducer;