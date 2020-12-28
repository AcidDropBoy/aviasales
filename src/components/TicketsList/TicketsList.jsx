import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../system/actions';
import Ticket from '../Ticket/Ticket';

const TicketsList = ({
  tickets,
  ticketsFilter,
  loadingStop,
  apiKey,
  viewTickets,
  loadingStopState,
  getTickesCreator,
  apiKeyCreator,
  reDownloadCreator,
}) => {
  useEffect(() => {
    if (apiKey === '') {
      apiKeyCreator();
    } else if (!loadingStopState) {
      getTickesCreator(apiKey);
    } else {
      loadingStop();
    }
  }, [apiKey, tickets, getTickesCreator, loadingStop, loadingStopState, apiKeyCreator]);
  const TicketArrayLimit = ticketsFilter.filter((item, view) => view < viewTickets);
  const noFilter = <>Рейсов, подходящих под заданные фильтры, не найдено</>;
  const list =
    TicketArrayLimit.length !== 0
      ? TicketArrayLimit.map((ticket, i) => {
          const id = i;
          function priceWithSpaces(price) {
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
          }
          return (
            <Ticket
              key={id}
              price={priceWithSpaces(ticket.price)}
              carrier={ticket.carrier}
              segments={ticket.segments}
            />
          );
        })
      : noFilter;

  const result = <>{!loadingStop ? reDownloadCreator(apiKey) : list}</>;

  return <div>{result}</div>;
};
const mapStateToProps = (state) => {
  return {
    tickets: state.tickets,
    ticketsFilter: state.ticketsFilter,
    error: state.error,
    viewTickets: state.viewTickets,
    loading: state.loading,
    apiKey: state.apiKey,
    loadingStopState: state.loadingStop,
  };
};
const mapDispatchToProps = (dispatch) => {
  const { getTickesCreator, loadingStop, apiKeyCreator, reDownloadCreator } = bindActionCreators(actions, dispatch);
  return {
    getTickesCreator,
    apiKeyCreator,
    loadingStop,
    reDownloadCreator,
  };
};

TicketsList.defaultProps = {
  tickets: [],
  ticketsFilter: [],
  loadingStop: () => {},
  apiKey: '',
  viewTickets: 7,
  loadingStopState: false,
  getTickesCreator: () => {},
  apiKeyCreator: () => {},
  reDownloadCreator: () => {},
};
TicketsList.propTypes = {
  tickets: PropTypes.arrayOf(PropTypes.objectOf),
  ticketsFilter: PropTypes.arrayOf(PropTypes.objectOf),
  loadingStop: PropTypes.func,
  apiKey: PropTypes.string,
  viewTickets: PropTypes.number,
  loadingStopState: PropTypes.bool,
  getTickesCreator: PropTypes.func,
  apiKeyCreator: PropTypes.func,
  reDownloadCreator: PropTypes.func,
};
export default connect(mapStateToProps, mapDispatchToProps)(TicketsList);
