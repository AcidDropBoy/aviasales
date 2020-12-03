import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import scss from './ticket.module.scss';
import 'antd/dist/antd.css';

const Ticket = ({ price, carrier, segments }) => {
  const timeStops = (time) => {
    const hour = Math.round(time / 60);
    const min = time % 60;
    return `${hour} ч ${min} м`;
  };
  const dataTicket = (value) => {
    const array = value.split('T');
    const day = array[0];
    const time = array[1].split('.')[0];
    return `${day} ${time}`;
  };
  return (
    <div className={`${scss.ticket} ${scss['ticket_m-b-20']}`}>
      <Row className={scss.ticket__head}>
        <Col span={16}>
          <div className={scss.price}>{price} P</div>
        </Col>
        <Col span={8} className={scss.logo}>
          <img src={`//pics.avs.io/99/36/${carrier}.png`} alt="логотип" />
        </Col>
      </Row>
      <Row className={scss['ticket_m-b-10']}>
        <Col span={8} className={scss['text-info']}>
          <span className={scss['text-info_gray']}>
            {segments[0].origin}-{segments[0].destination}
          </span>
          <span>{dataTicket(segments[0].date)}</span>
        </Col>
        <Col span={8} className={scss['text-info']}>
          <span className={scss['text-info_gray']}>В пути</span>
          <span>{timeStops(segments[0].duration)}</span>
        </Col>
        <Col span={8} className={scss['text-info']}>
          <span className={scss['text-info_gray']}>
            {segments[0].stops.length ? `${segments[0].stops.length} пересадки` : null}
          </span>
          <span>{segments[0].stops.join(', ')}</span>
        </Col>
      </Row>
      <Row>
        <Col span={8} className={scss['text-info']}>
          <span className={scss['text-info_gray']}>
            {segments[1].origin}-{segments[1].destination}
          </span>
          <span>{dataTicket(segments[1].date)}</span>
        </Col>
        <Col span={8} className={scss['text-info']}>
          <span className={scss['text-info_gray']}>В пути</span>
          <span>{timeStops(segments[1].duration)}</span>
        </Col>
        <Col span={8} className={scss['text-info']}>
          <span className={scss['text-info_gray']}>
            {segments[1].stops.length ? `${segments[1].stops.length} пересадки` : null}
          </span>
          <span>{segments[1].stops.join(', ')}</span>
        </Col>
      </Row>
    </div>
  );
};

Ticket.defaultProps = {
  price: '',
  carrier: '',
  segments: 1,
};
Ticket.propTypes = {
  price: PropTypes.string,
  carrier: PropTypes.string,
  segments: PropTypes.number,
};
export default Ticket;
