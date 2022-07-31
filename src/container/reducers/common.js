export const onSuccess = (state, action) => {
  return {
      ...state,
      ...action.payload,
      isLoading: false,
  };
};

export const onFailure = (state, action) => {
  return { ...state, isLoading: false, errorData: action.payload, error: true };
};