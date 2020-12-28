const defaultState = {
  tickets: [],
  ticketsFilter: [],
  sort: 'cheap',
  filter: {
    all: true,
    noTransfers: true,
    oneTransfer: true,
    twoTransfer: true,
    threeTransfer: true,
  },
  loadingStop: false,
  error: false,
  viewTickets: 7,
  apiKey: '',
};
const isFilter = ({ noTransfers, oneTransfer, twoTransfer, threeTransfer, all }, item) => {
  if (
    (item.segments[0].stops.length === 0 && item.segments[1].stops.length === 0 && noTransfers) ||
    (item.segments[0].stops.length === 1 && item.segments[1].stops.length === 1 && oneTransfer) ||
    (item.segments[0].stops.length === 2 && item.segments[1].stops.length === 2 && twoTransfer) ||
    (item.segments[0].stops.length === 3 && item.segments[1].stops.length === 3 && threeTransfer) ||
    all
  ) {
    return true;
  }
  return false;
};
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'CHEAP':
      return { ...state, sort: 'cheap' };
    case 'FAST':
      return { ...state, sort: 'fast' };
    case 'FILTER_ALL': {
      const newState = !state.filter.all;
      const newStateTicket = state.tickets.filter((item) => isFilter(state.filter, item));
      return {
        ...state,
        ticketsFilter: newStateTicket,
        viewTickets: 7,
        filter: {
          all: newState,
          noTransfers: newState,
          oneTransfer: newState,
          twoTransfer: newState,
          threeTransfer: newState,
        },
      };
    }
    case 'FILTER_NO_TRANSFERS': {
      const newNoTransfers = !state.filter.noTransfers;
      const allState = !!(
        newNoTransfers &&
        state.filter.oneTransfer &&
        state.filter.twoTransfer &&
        state.filter.threeTransfer
      );
      const newState = state.tickets.filter((item) => isFilter(state.filter, item));
      return {
        ...state,
        ticketsFilter: newState,
        viewTickets: 7,
        filter: { ...state.filter, noTransfers: newNoTransfers, all: allState },
      };
    }

    case 'FILTER_ONE_TRANSFERS': {
      const newOneTransfer = !state.filter.oneTransfer;
      const allState = !!(
        newOneTransfer &&
        state.filter.noTransfers &&
        state.filter.twoTransfer &&
        state.filter.threeTransfer
      );
      const newState = state.tickets.filter((item) => isFilter(state.filter, item));
      return {
        ...state,
        ticketsFilter: newState,
        viewTickets: 7,
        filter: { ...state.filter, oneTransfer: newOneTransfer, all: allState },
      };
    }
    case 'FILTER_TWO_TRANSFERS': {
      const newTwoTransfer = !state.filter.twoTransfer;
      const allState = !!(
        newTwoTransfer &&
        state.filter.noTransfers &&
        state.filter.oneTransfer &&
        state.filter.threeTransfer
      );
      const newState = state.tickets.filter((item) => isFilter(state.filter, item));
      return {
        ...state,
        ticketsFilter: newState,
        viewTickets: 7,
        filter: { ...state.filter, twoTransfer: newTwoTransfer, all: allState },
      };
    }
    case 'FILTER_THREE_TRANSFERS': {
      const newThreeTransfer = !state.filter.threeTransfer;
      const allState = !!(
        newThreeTransfer &&
        state.filter.noTransfers &&
        state.filter.oneTransfer &&
        state.filter.twoTransfer
      );
      const newState = state.tickets.filter((item) => isFilter(state.filter, item));
      return {
        ...state,
        ticketsFilter: newState,
        viewTickets: 7,
        filter: { ...state.filter, threeTransfer: newThreeTransfer, all: allState },
      };
    }
    case 'GET_TICKETS': {
      const newState = state.tickets.filter((item) => isFilter(state.filter, item));
      if (state.sort === 'cheap') {
        newState.sort((itemA, itemB) => itemA.price - itemB.price);
      } else {
        newState.sort(
          (itemA, itemB) =>
            itemA.segments[0].duration +
            itemA.segments[1].duration -
            (itemB.segments[0].duration + itemB.segments[1].duration)
        );
      }
      return {
        ...state,
        ticketsFilter: newState,
        tickets: [...state.tickets, ...action.tickets],
        error: false,
        loadingStop: action.load,
      };
    }

    case 'API_KEY':
      return { ...state, apiKey: action.key };
    case 'ERROR':
      return { ...state, error: true };
    case 'RE_DOWNLOAD':
      return { ...state, error: false };
    case 'UP_VIEW_TICKETS':
      return { ...state, viewTickets: state.viewTickets + 3 };
    case 'NEW_TICKETS_STATE': {
      const newState = state.tickets.filter((item) => isFilter(state.filter, item));
      if (state.sort === 'cheap') {
        newState.sort((itemA, itemB) => itemA.price - itemB.price);
      } else {
        newState.sort(
          (itemA, itemB) =>
            itemA.segments[0].duration +
            itemA.segments[1].duration -
            (itemB.segments[0].duration + itemB.segments[1].duration)
        );
      }
      return {
        ...state,
        ticketsFilter: newState,
      };
    }
    default:
      return state;
  }
};
export default reducer;
