import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col, Checkbox } from 'antd';
import * as actions from '../../system/actions';
import 'antd/dist/antd.css';
import style from './filter.module.scss';
import ItemFilter from './ItemFilter';

const Filter = ({
  filter,
  filterAll,
  filterNoTransfers,
  filterOneTransfer,
  filterTwoTransfer,
  filterThreeTransfer,
  filterCreator,
}) => {
  return (
    <Row className={style.filter}>
      <Col span={24}>
        <h2 className={style.head}>Количество пересадок</h2>
      </Col>
      <Col span={24} className={style.filter__item}>
        {filter.all}
        <Checkbox
          onChange={useCallback(() => filterCreator(filterAll), [filterCreator, filterAll])}
          checked={filter.all}
        >
          <ItemFilter name="Все" />
        </Checkbox>
      </Col>
      <Col span={24} className={style.filter__item}>
        <Checkbox
          onChange={useCallback(() => filterCreator(filterNoTransfers), [filterCreator, filterNoTransfers])}
          checked={filter.noTransfers}
        >
          <ItemFilter name="Без пересадок" />
        </Checkbox>
      </Col>
      <Col span={24} className={style.filter__item}>
        <Checkbox
          onChange={useCallback(() => filterCreator(filterOneTransfer), [filterCreator, filterOneTransfer])}
          checked={filter.oneTransfer}
        >
          <ItemFilter name="1 пересадка" />
        </Checkbox>
      </Col>
      <Col span={24} className={style.filter__item}>
        <Checkbox
          onChange={useCallback(() => filterCreator(filterTwoTransfer), [filterCreator, filterTwoTransfer])}
          checked={filter.twoTransfer}
        >
          <ItemFilter name="2 пересадки" />
        </Checkbox>
      </Col>
      <Col span={24} className={style.filter__item}>
        <Checkbox
          onChange={useCallback(() => filterCreator(filterThreeTransfer), [filterCreator, filterThreeTransfer])}
          checked={filter.threeTransfer}
        >
          <ItemFilter name="3 пересадки" />
        </Checkbox>
      </Col>
    </Row>
  );
};
const mapStateToProps = (state) => {
  return {
    filter: state.filter,
  };
};
const mapDispatchToProps = (dispatch) => {
  const {
    filterAll,
    filterNoTransfers,
    filterOneTransfer,
    filterTwoTransfer,
    filterThreeTransfer,
    filterCreator,
  } = bindActionCreators(actions, dispatch);
  return {
    filterAll,
    filterNoTransfers,
    filterOneTransfer,
    filterTwoTransfer,
    filterThreeTransfer,
    filterCreator,
  };
};
Filter.defaultProps = {
  filter: {},
  filterAll: () => {},
  filterNoTransfers: () => {},
  filterOneTransfer: () => {},
  filterTwoTransfer: () => {},
  filterThreeTransfer: () => {},
  filterCreator: () => {},
};
Filter.propTypes = {
  filter: PropTypes.objectOf(PropTypes.bool),
  filterAll: PropTypes.func,
  filterNoTransfers: PropTypes.func,
  filterOneTransfer: PropTypes.func,
  filterTwoTransfer: PropTypes.func,
  filterThreeTransfer: PropTypes.func,
  filterCreator: PropTypes.func,
};
export default connect(mapStateToProps, mapDispatchToProps)(Filter);
