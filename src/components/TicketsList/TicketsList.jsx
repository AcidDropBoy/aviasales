import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import RingLoader from 'react-spinners/RingLoader';
import 'antd/dist/antd.css';
import { Alert, Button } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../system/actions';
import Ticket from './Ticket';

const TicketsList = ({
  tickets,
  ticketsFilter,
  loadingStop,
  error,
  apiKey,
  viewTickets,
  loadingStopState,
  getTickesCreator,
  apiKeyCreator,
  reDownloadCreator,
  upViewTicketsCreator,
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
  const useReDownloadCreator = useCallback(() => reDownloadCreator(apiKey), [apiKey, reDownloadCreator]);
  const useUpViewTickets = useCallback(() => upViewTicketsCreator(), [upViewTicketsCreator]);
  const override = `
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
  const TicketArrayLimit = ticketsFilter.filter((item, view) => view < viewTickets);
  const noFilter = <>Рейсов, подходящих под заданные фильтры, не найдено</>;
  const list =
    TicketArrayLimit.length !== 0
      ? TicketArrayLimit.map((ticket, i) => {
          const id = i;
          return <Ticket key={id} price={ticket.price} carrier={ticket.carrier} segments={ticket.segments} />;
        })
      : noFilter;
  const result = (
    <>
      {error && loadingStop ? (
        <>
          <Alert message="Часть билетов не загрузилась" type="error" showIcon />
          <Button type="primary" block onClick={useReDownloadCreator}>
            Нажмитие, чтобы повторить попытку
          </Button>
        </>
      ) : null}
      {!loadingStopState ? <RingLoader css={override} size={60} color="#123abc" /> : null}
      {list || null}

      {TicketArrayLimit.length < ticketsFilter.length ? (
        <Button type="primary" block onClick={useUpViewTickets}>
          Загрузить еще
        </Button>
      ) : null}

      <div />
    </>
  );
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
  const { getTickesCreator, loadingStop, apiKeyCreator, reDownloadCreator, upViewTicketsCreator } = bindActionCreators(
    actions,
    dispatch
  );
  return {
    getTickesCreator,
    apiKeyCreator,
    loadingStop,
    reDownloadCreator,
    upViewTicketsCreator,
  };
};

TicketsList.defaultProps = {
  tickets: [],
  ticketsFilter: [],
  loadingStop: () => {},
  error: false,
  apiKey: '',
  viewTickets: 7,
  loadingStopState: false,
  getTickesCreator: () => {},
  apiKeyCreator: () => {},
  reDownloadCreator: () => {},
  upViewTicketsCreator: () => {},
};
TicketsList.propTypes = {
  tickets: PropTypes.arrayOf(PropTypes.objectOf),
  ticketsFilter: PropTypes.arrayOf(PropTypes.objectOf),
  loadingStop: PropTypes.func,
  error: PropTypes.bool,
  apiKey: PropTypes.string,
  viewTickets: PropTypes.number,
  loadingStopState: PropTypes.bool,
  getTickesCreator: PropTypes.func,
  apiKeyCreator: PropTypes.func,
  reDownloadCreator: PropTypes.func,
  upViewTicketsCreator: PropTypes.func,
};
export default connect(mapStateToProps, mapDispatchToProps)(TicketsList);
