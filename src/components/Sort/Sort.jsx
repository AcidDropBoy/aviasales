import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import clsx from 'clsx';
import { Row, Col } from 'antd';
import * as actions from '../../system/actions';
import ItemSort from './ItemSort';
import style from './sort.module.scss';

const Sort = ({ sort, cheap, fast, sortCreator }) => {
  return (
    <Row className={`${style.sort} ${style.conteiner__sort}`} justify="space-between">
      <Col
        span={12}
        onClick={useCallback(() => sortCreator(cheap), [sortCreator, cheap])}
        className={clsx(`${style.item} ${style['item_border-l']}`, sort === 'cheap' && `${style.active}`)}
      >
        <ItemSort name="Самый дешевый" />
      </Col>
      <Col
        span={12}
        onClick={useCallback(() => sortCreator(fast), [sortCreator, fast])}
        className={clsx(`${style.item}`, sort === 'fast' && `${style.active} ${style['active_border-r']}`)}
      >
        <ItemSort name="Самый быстрый" />
      </Col>
    </Row>
  );
};
const mapStateToProps = (state) => {
  return {
    sort: state.sort,
  };
};
const mapDispatchToProps = (dispatch) => {
  const { cheap, fast, sortCreator } = bindActionCreators(actions, dispatch);
  return {
    cheap,
    fast,
    sortCreator,
  };
};
Sort.defaultProps = {
  sort: 'cheap',
  cheap: () => {},
  fast: () => {},
  sortCreator: () => {},
};
Sort.propTypes = {
  sort: PropTypes.string,
  cheap: PropTypes.func,
  fast: PropTypes.func,
  sortCreator: PropTypes.func,
};
export default connect(mapStateToProps, mapDispatchToProps)(Sort);
