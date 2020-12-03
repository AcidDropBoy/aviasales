import React from 'react';
import PropTypes from 'prop-types';

const ItemSort = ({ name }) => {
  return <button type="button">{name}</button>;
};
ItemSort.defaultProps = {
  name: '',
};
ItemSort.propTypes = {
  name: PropTypes.string,
};
export default ItemSort;
