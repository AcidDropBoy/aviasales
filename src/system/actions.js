import Api from './api';

const getApi = new Api();
export const cheap = () => {
  return { type: 'CHEAP' };
};
export const fast = () => {
  return { type: 'FAST' };
};
export const filterAll = () => {
  return { type: 'FILTER_ALL' };
};
export const filterNoTransfers = () => {
  return { type: 'FILTER_NO_TRANSFERS' };
};
export const filterOneTransfer = () => {
  return { type: 'FILTER_ONE_TRANSFERS' };
};
export const filterTwoTransfer = () => {
  return { type: 'FILTER_TWO_TRANSFERS' };
};
export const filterThreeTransfer = () => {
  return { type: 'FILTER_THREE_TRANSFERS' };
};
export const getTickes = (value, load) => {
  return { type: 'GET_TICKETS', tickets: value, load };
};
export const loadingStop = () => {
  return { type: 'LOADING_STOP' };
};

export const newTicketsState = () => {
  return { type: 'NEW_TICKETS_STATE' };
};
export const getError = () => {
  return { type: 'ERROR' };
};
export const apiKey = (key) => {
  return { type: 'API_KEY', key };
};
export const reDownload = () => {
  return { type: 'RE_DOWNLOAD' };
};
export const upViewTickets = () => {
  return { type: 'UP_VIEW_TICKETS' };
};

export const getTickesCreator = (apiKeyState) => (dispatch) => {
  getApi
    .getApiTicket(apiKeyState)
    .then((res) => {
      dispatch(getTickes(res.tickets, res.stop));
    })
    .catch(() => {
      dispatch(getError());
    });
};
export const filterCreator = (fn) => (dispatch) => {
  fn();
  dispatch(newTicketsState());
};
export const sortCreator = (fn) => (dispatch) => {
  fn();
  dispatch(newTicketsState());
};
export const apiKeyCreator = () => (dispatch) => {
  getApi.getKey().then((key) => {
    dispatch(apiKey(key.searchId));
  });
};
export const upViewTicketsCreator = () => (dispatch) => {
  dispatch(upViewTickets());
};
export const reDownloadCreator = (apiKeyState) => (dispatch) => {
  dispatch(reDownload());
  getApi
    .getApiTicket(apiKeyState)
    .then((res) => {
      dispatch(getTickes(res.tickets, res.stop));
    })
    .catch(() => {
      dispatch(getError());
    });
};
