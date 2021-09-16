export const initialState = {
  posts: {
    data: [],
    loading: {
      active: false,
      error: false,
    },
  },
  user: {
    active: false,
    admin: false,
    mail: '',
    error: false,
  },
};
