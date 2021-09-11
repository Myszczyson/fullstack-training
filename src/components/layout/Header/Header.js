import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import { faUser, faScroll, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Header.module.scss';



const Component = ({className}) => (
  <div className={clsx(className, styles.root)}>
    <div className={styles.container}>
      <section className={styles.logo}>
        <a href='/'><h1>Bulletin Board</h1></a>
      </section>
      <section className={styles.user}>
        <a href='/login/auth'><FontAwesomeIcon icon={faUser}/></a>
        <a href={'isLogged' ? '/:user/posts' : '/login/auth'}><FontAwesomeIcon icon={faScroll}/></a>
        <a href='/login/auth/logout'><FontAwesomeIcon icon={faSignOutAlt}/></a>
      </section>
    </div>
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
  Component as Header,
  // Container as Header,
  Component as HeaderComponent,
};