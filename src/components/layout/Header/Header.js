import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import { faUser, faScroll, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Header.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getInfo, getUser } from '../../../redux/userRedux';




const Component = ({className}) => {

  const dispatch = useDispatch();
  const user = useSelector(state => getInfo(state));


  return (
    <div className={clsx(className, styles.root)}>
      <div className={styles.container}>
        <section className={styles.logo}>
          <a href='/'><h1>Bulletin Board</h1></a>
        </section>
        <section className={styles.user}>
          <a href='http://localhost:8000/auth/google' className={clsx(user.active && styles.visible)}><FontAwesomeIcon icon={faUser}/></a>
          <a href={user.active ? '/:user/posts' : 'http://localhost:8000/auth/google'} className={clsx(!user.active && styles.hidden)}><FontAwesomeIcon icon={faScroll}/></a>
          <a href='http://localhost:8000/auth/logout' className={clsx(!user.active && styles.hidden)}><FontAwesomeIcon icon={faSignOutAlt}/></a>
        </section>
      </div>
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
};


export {
  Component as Header,
  Component as HeaderComponent,
};
