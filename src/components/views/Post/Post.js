import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Post.module.scss';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getById, fetchById } from '../../../redux/postsRedux.js';


const Component = ({className}) => {

  const dispatch = useDispatch();
  const { id } = useParams();
  const post = useSelector(state => getById(state, id));

  useEffect(() => {
    dispatch(fetchById(id));
  }, [dispatch, id]);

  if(!post) return null;

  return (
    <div className={clsx(className, styles.root)}>
      <div className={styles.imgContainer}>
        <img src={post.photo ? post.photo : 'https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg'} alt='IMG'></img>
      </div>
      <div className={styles.post}>
        <h3>{post.title}</h3>
        <p>{post.text}</p>
        <div className={styles.info}>
          <p>Published: {post.created}</p>
          <p>Price: {post.price ? post.price : 'Not disclosed'}</p>
        </div>
        <div className={styles.author}>
          <p>Author: {post.author}</p>
          <p>Phone: {post.phone ? post.phone : 'Not dislosed'}</p>
          <p>Location: {post.location ? post.location : 'Not dislosed'}</p>
        </div>
        <h5 className={styles.status}>{post.status}</h5>
      </div>
      <a href={`/post/:id/edit`}><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></a>
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
};

export {
  Component as Post,
  Component as PostComponent,
};
