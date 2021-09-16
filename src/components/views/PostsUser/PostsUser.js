import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import styles from './PostsUser.module.scss';

import { PostBox } from '../../features/PostBox/PostBox';
import { useDispatch, useSelector } from 'react-redux';
import { getInfo } from '../../../redux/userRedux';
import { fetchUserPosts, getUserPosts } from '../../../redux/postsRedux';


const Component = ({className}) => {

  const dispatch = useDispatch();
  const user = useSelector(state => getInfo(state));
  const posts = useSelector(state => getUserPosts(state, user.mail));


  useEffect(() => {
    if(user.active){
      dispatch(fetchUserPosts(user.mail));
    }
  }, [dispatch, user.active, user.mail]);


  if(!posts) return null;

  return (
    <div className={clsx(className, styles.root)}>
      <p> Your posts </p>
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
  Component as PostsUser,
  Component as PostsUserComponent,
};
