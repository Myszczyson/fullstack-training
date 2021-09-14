import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import { faUser, faScroll, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Header.module.scss';



const Component = ({className}) => (
  <div className={clsx(className, styles.root)}>
    <div className={styles.container}>
      <section className={styles.logo}>
        <a href='/'><h1>Bulletin Board</h1></a>
      </section>
      <section className={styles.user}>
        <a href='/login/auth' className={clsx('users.params' && styles.hidden)}><FontAwesomeIcon icon={faUser}/></a>
        <a href={'isLogged' ? '/:user/posts' : '/login/auth'} className={styles.userPosts}><FontAwesomeIcon icon={faScroll}/></a>
        <a href='/login/auth/logout' className={styles.logout}><FontAwesomeIcon icon={faSignOutAlt}/></a>
      </section>
    </div>
  </div>
);

Component.propTypes = {
  className: PropTypes.string,
};


export {
  Component as Header,
  Component as HeaderComponent,
};
