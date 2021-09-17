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
        <label>Image src=</label>
        <input type='text' name='photo' id='photo' onChange={setFormParam}/>
      </div>
      <div className={styles.post}>
        <label>Title</label>
        <input type='text' minLength='10' maxLength='50' rows='2' name='title' id='title' defaultValue={post.title} required={true} onChange={setFormParam}/>

        <label>Description</label>
        <textarea type='text' minLength='20' maxLength='120' rows='4' name='text' id='text' defaultValue={post.text} required={true} onChange={setFormParam}/>

        <div className={styles.info}>

          <label>Price:
            <input type='number'  min='0.00' max='10000.00' step='0.01' name='price' id='price' defaultValue={post.price} onChange={setFormParam}/>
          </label>

          <label>Phone:
            <input type='tel' name='phone' id='phone' defaultValue={post.phone} onChange={setFormParam}/>
          </label>

          <label>Location:
            <input type='text' name='location' id='location' defaultValue={post.location} onChange={setFormParam}/>
          </label>


        </div>
        <div className={styles.status}>

          <label>Change status</label>
          <select name='status' id='status' onChange={setFormParam}>
            <option value='published' defaultValue={post.status === 'published' ? true : false} id='status-1'>Published</option>
            <option value='draft' defaultValue={post.status === 'draft' ? true : false} id='status-2'>Draft</option>
            <option value='closed' defaultValue={post.status === 'closed' ? true : false} id='status-3'>Closed</option>
          </select>
          <button className={styles.submit} type='submit'>Submit changes</button>

        </div>

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
