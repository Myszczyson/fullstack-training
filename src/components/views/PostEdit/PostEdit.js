import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import styles from './PostEdit.module.scss';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getById, fetchById, edit } from '../../../redux/postsRedux.js';


const Component = ({className}) => {

  const dispatch = useDispatch();
  const { id } = useParams();
  const post = useSelector(state => getById(state, id));

  useEffect(() => {
    dispatch(fetchById(id));
  }, [dispatch, id]);

  useEffect(() => {
    setForm({
      ...post,
    });
  }, [post]);

  const [form, setForm] = useState({
    _id: '',
    author: '',
    created: '',
    updated: '',
    status: '',
    title: '',
    text: '',
    photo: '',
    price: '',
    phone: '',
    location: '',
  });

  const setFormParam = (e) => {
    setForm({...form, [e.target.name] : e.target.value});
  };



  if(!post) return null;
  return (
    <form className={clsx(className, styles.root)} onSubmit={() => dispatch(edit(form))}>
      <div className={styles.imgContainer}>
        <label>Image</label>
        <input type='text' name='photo' id='photo' onChange={setFormParam}/>
      </div>
      <div className={styles.post}>
        <label>Title</label>
        <input type='text' name='title' id='title' defaultValue={post.title} required={true} onChange={setFormParam}/>

        <label>Text</label>
        <input type='text' name='text' id='text' defaultValue={post.text} required={true} onChange={setFormParam}/>

        <div className={styles.info}>

          <label>Price:</label>
          <input type='number' name='price' id='price' defaultValue={post.price} onChange={setFormParam}/>


          <label>Location:
            <input type='text' name='location' id='location' defaultValue={post.location} onChange={setFormParam}/>
          </label>

        </div>
        <div className={styles.author}>

          <label>Email:
            <input type='text' name='author' id='author' defaultValue={post.author} required={true} onChange={setFormParam}/>
          </label>

          <label>Phone:
            <input type='tel' name='phone' id='phone' defaultValue={post.phone} onChange={setFormParam}/>
          </label>


        </div>
        <label>Change status</label>
        <select className='status' name='status' id='status' onChange={setFormParam}>
          <option value='published' defaultValue={post.status === 'published' ? true : false} id='status-1'>Published</option>
          <option value='draft' defaultValue={post.status === 'draft' ? true : false} id='status-2'>Draft</option>
          <option value='closed' defaultValue={post.status === 'closed' ? true : false} id='status-3'>Closed</option>
        </select>
        <button className={styles.submit} type='submit'>Submit changes</button>
      </div>
    </form>
  );
};

Component.propTypes = {
  className: PropTypes.string,
};

export {
  Component as PostEdit,
  Component as PostEditComponent,
};
