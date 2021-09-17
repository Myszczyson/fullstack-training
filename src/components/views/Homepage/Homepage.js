import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { useDispatch, useSelector } from 'react-redux';
import { getAllPublished, fetchPublished } from '../../../redux/postsRedux.js';

import styles from './Homepage.module.scss';
import { SearchBar } from '../../features/SearchBar/SearchBar/SearchBar';
import { Button } from '../../common/Button/Button/Button';
import { PostBox } from '../../features/PostBox/PostBox';
import { getInfo } from '../../../redux/userRedux.js';

const Component = ({className}) => {

  const dispatch = useDispatch();
  const user = useSelector(state => getInfo(state));
  const posts = useSelector(state => getAllPublished(state));

  useEffect(() =>{
    dispatch(fetchPublished());
  }, [dispatch]);

  if(!posts) return null;

  return (
    <div className={clsx(className, styles.root)}>
      <section className={styles.bar}>
        <SearchBar />
        {user.active ? <Button href='/post/add' className={styles.postAdd} name={'New post'}/> : null}
      </section>
      <section className={styles.posts}>
        {posts.map(post => <PostBox key={post.id} {...post} />)}
      </section>
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
};

export {
  Component as Homepage,
  Component as HomepageComponent,
};
