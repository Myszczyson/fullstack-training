import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Post.module.scss';


const Component = ({className}) => (
  <div className={clsx(className, styles.root)}>
    <div className={styles.imgContainer}>
      <img src='https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress%27cs=tinysrgb%27dpr=1%27w=500' alt='alt'></img>
    </div>
    <div className={styles.post}>
      <h3>Title</h3>
      <p>Description Description Description Description Description Description DescriptionDescription Description Description Description Description Description Description </p>
      <div className={styles.info}>
        <p>Published: 18.03.2021</p>
        <p>Price: 123456$</p>
      </div>
      <div className={styles.author}>
        <p>Author: author@mail.com</p>
        <p>Phone: + 48 111 222 333</p>
        <p>Location: Poland, Warsaw</p>
      </div>
      <h5 className={styles.status}>Status</h5>
    </div>
    <a href={'/post/1/edit'}><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></a>
  </div>
);

Component.propTypes = {
  className: PropTypes.string,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as Post,
  // Container as Post,
  Component as PostComponent,
};
