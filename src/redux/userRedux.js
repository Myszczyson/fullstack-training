import Axios from 'axios';

/* selectors */
export const getAll = ({ posts }) => posts.data;
export const getAllPublished = ({ posts }) => posts.data.filter(item => item.status !== 'published');
export const getById = ({ posts }, id) => posts.data.find(item => item._id === id);

/* action name creator */
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');

const FETCH_ID_START = createActionName('FETCH_ID_START');
const FETCH_ID_SUCCESS = createActionName('FETCH_ID_SUCCESS');
const FETCH_ID_ERROR = createActionName('FETCH_ID_ERROR');

const CREATE_START = createActionName('CREATE_START');
const CREATE_SUCCESS = createActionName('CREATE_SUCCESS');
const CREATE_ERROR = createActionName('CREATE_ERROR');

const EDIT_START = createActionName('EDIT_START');
const EDIT_SUCCESS = createActionName('EDIT_SUCCESS');
const EDIT_ERROR = createActionName('EDIT_ERROR');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });

export const fetchByIdStarted = payload => ({ payload, type: FETCH_ID_START });
export const fetchByIdSuccess = payload => ({ payload, type: FETCH_ID_SUCCESS });
export const fetchByIdError = payload => ({ payload, type: FETCH_ID_ERROR });

export const createStarted = payload => ({ payload, type: CREATE_START });
export const createSuccess = payload => ({ payload, type: CREATE_SUCCESS });
export const createError = payload => ({ payload, type: CREATE_ERROR });

export const editStarted = payload => ({ payload, type: EDIT_START });
export const editSuccess = payload => ({ payload, type: EDIT_SUCCESS });
export const editError = payload => ({ payload, type: EDIT_ERROR });

/* thunk creators */
export const fetchPublished = () => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());

    Axios
      .get('http://localhost:8000/api/posts')
      .then(res => {
        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const fetchById = (id) => {
  return (dispatch, getState) => {
    dispatch(fetchByIdStarted());

    Axios
      .get(`http://localhost:8000/api/posts/${id}`)
      .then(res => {
        dispatch(fetchByIdSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchByIdError(err.message || true));
      });
  };
};

export const create = (form) => {
  return (dispatch, getState) => {
    dispatch(createStarted());

    Axios
      .post('http://localhost:8000/api/posts', form)
      .then(res => {
        dispatch(createSuccess(res.data));
      })
      .catch(err => {
        dispatch(createError(err.message || true));
      });
  };
};

export const edit = (form) => {
  return (dispatch, getState) => {
    dispatch(editStarted());

    Axios
      .put(`http://localhost:8000/api/posts/${form._id}/edit`, form)
      .then(res => {
        dispatch(editSuccess(res.data));
      })
      .catch(err => {
        dispatch(editError(err.message || true));
      });
  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }

    case FETCH_ID_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_ID_SUCCESS: {
      const refreshedPost = action.payload;
      const doesExist = statePart.data.some(item => item._id === refreshedPost._id);

      const data = doesExist ? statePart.data.map(item => {
        return (item._id === refreshedPost._id) ? refreshedPost : item;
      }) : [...statePart.data, refreshedPost];

      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data,
      };
    }
    case FETCH_ID_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }

    case CREATE_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case CREATE_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: [...statePart.data, action.payload],
      };
    }
    case CREATE_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }

    case EDIT_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case EDIT_SUCCESS: {
      const refreshedPost = action.payload;
      const doesExist = statePart.data.some(item => item._id === refreshedPost._id);

      const data = doesExist ? statePart.data.map(item => {
        return (item._id === refreshedPost._id) ? refreshedPost : item;
      }) : [...statePart.data, refreshedPost];

      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data,
      };
    }
    case EDIT_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }

    default:
      return statePart;
  }
};
