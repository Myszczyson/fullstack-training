import React, { useEffect } from 'react';
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

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);


  return (
    <div className={clsx(className, styles.root)}>
      <div className={styles.container}>
        <section className={styles.logo}>
          <a href='/'><h1>Bulletin Board</h1></a>
        </section>
        <section className={styles.user}>
          {!user.active ? <a href='http://localhost:8000/auth/google'><FontAwesomeIcon icon={faUser}/></a> : null}
          {user.active ? <p className={styles.logged}>Logged as {user.mail}</p> : null}
          {user.active ? <a href={`/${user.mail}/posts`}><FontAwesomeIcon icon={faScroll}/></a> : null}
          {user.active ? <a href='http://localhost:8000/auth/logout'><FontAwesomeIcon icon={faSignOutAlt}/></a> : null}
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
