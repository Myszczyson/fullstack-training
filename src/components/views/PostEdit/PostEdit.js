import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import styles from './PostEdit.module.scss';
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
        <input type='file' accept='.jpg, .png, .gif' defaultValue={post.photo}/>
      </div>
      <div className={styles.post}>
        <input type='text' defaultValue={post.title} required='true'/>
        <input type='text' defaultValue={post.text} required='true'/>
        <div className={styles.info}>
          <input type='date' disabled='true' required='true'/>
          <input type='number' defaultValue={post.price} required='true'/>
        </div>
        <div className={styles.author}>
          <input type='text' defaultValue={post.author} required='true'/>
          <input type='number' defaultValue={post.phone} required='true'/>
          <input type='text' defaultValue={post.location} required='true'/>
        </div>
        <select className='status' name='status' id='status'>
          <option value='published' defaultValue={post.status === 'published' ? true : false} id='status-1'>Published</option>
          <option value='draft' defaultValue={post.status === 'draft' ? true : false} id='status-1'>Draft</option>
          <option value='closed' defaultValue={post.status === 'closed' ? true : false} id='status-1'>Closed</option>
        </select>
        <button className={styles.submit}type='submit'>Submit changes</button>
      </div>
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
};

export {
  Component as PostEdit,
  Component as PostEditComponent,
};
