import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import styles from './Button.module.scss';

const Component = ({className, name, href}) => (
  <div className={clsx(className, styles.root)}>
    <a href={href} className={styles.btn}>{name}</a>
  </div>
);

Component.propTypes = {
  name: PropTypes.string,
  href: PropTypes.string,
  className: PropTypes.string,
};

export {
  Component as Button,
  Component as ButtonComponent,
};
