import React from 'react';
import PropTypes from 'prop-types';

const ItemFilter = ({ name }) => {
  return <span>{name}</span>;
};
ItemFilter.defaultProps = {
  name: '',
};
ItemFilter.propTypes = {
  name: PropTypes.string,
};
export default ItemFilter;
