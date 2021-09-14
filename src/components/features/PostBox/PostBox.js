import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import styles from './PostBox.module.scss';

const Component = ({className, _id, title, created, price, photo}) => (
  <div className={clsx(className, styles.root)}>
    <a href={`/post/${_id}`}><h3>{title}</h3></a>
    {photo ?
      <div className={styles.imgContainer}>
        <img src={photo} alt='IMG'></img>
      </div>
      : null
    }
    <div className={styles.info}>
      <p>Published Date: {created}</p>
    </div>
  </div>
);

Component.propTypes = {
  className: PropTypes.string,
  _id: PropTypes.string,
  title: PropTypes.string,
  created: PropTypes.string,
  price: PropTypes.string,
  photo: PropTypes.string,
};

export {
  Component as PostBox,
  Component as PostBoxComponent,
};
