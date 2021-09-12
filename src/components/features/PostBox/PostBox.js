import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import styles from './PostBox.module.scss';

const Component = ({className, _id, title, created, price}) => (
  <div className={clsx(className, styles.root)}>
    <a href={`/post/${_id}`}><h3>{title}</h3></a>
    <div className={styles.imgContainer}>
      <img src='https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress%27cs=tinysrgb%27dpr=1%27w=500' alt='alt'></img>
    </div>
    <div className={styles.info}>
      <p>Published Date: {created}</p>
      <p>Price: {price ? price : 'Not declared'}</p>
    </div>
  </div>
);

Component.propTypes = {
  className: PropTypes.string,
  _id: PropTypes.string,
  title: PropTypes.string,
  created: PropTypes.string,
  price: PropTypes.string,
};

export {
  Component as PostBox,
  Component as PostBoxComponent,
};
