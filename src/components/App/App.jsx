import React from 'react';
import { Row, Col } from 'antd';
import style from './app.module.scss';
import logo from './Logo.png';
import 'antd/dist/antd.css';
import Filter from '../Filter/Filter';
import Sort from '../Sort/Sort';
import TicketsList from '../TicketsList/TicketsList';

const App = () => {
  return (
    <div className={`${style.container} ${style.body__container}`}>
      <img src={logo} className={style.logo} alt="логотип" />
      <Row gutter={[20, 0]} justify="center">
        <Col sm={{ span: 24 }} lg={{ span: 6 }}>
          <Filter />
        </Col>
        <Col sm={{ span: 24 }} lg={{ span: 10 }} className={style.tickets}>
          <Sort />
          <TicketsList />
        </Col>
      </Row>
    </div>
  );
};
export default App;
