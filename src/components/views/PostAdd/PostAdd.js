import React, { useState } from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import styles from './PostAdd.module.scss';
import { useDispatch } from 'react-redux';
import { create } from '../../../redux/postsRedux.js';


const Component = ({className}) => {

  const dispatch = useDispatch();
  const postDate = new Date();

  const [form, setForm] = useState({
    author: '',
    created: new Date(postDate.getFullYear(), postDate.getMonth(), postDate.getDate() ,postDate.getHours(), postDate.getMinutes(), postDate.getSeconds(), postDate.getMilliseconds()),
    updated: new Date(postDate.getFullYear(), postDate.getMonth(), postDate.getDate() ,postDate.getHours(), postDate.getMinutes(), postDate.getSeconds(), postDate.getMilliseconds()),
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

  return (
    <form className={clsx(className, styles.root)} onSubmit={() => dispatch(create(form))}>
      <div className={styles.imgContainer}>
        <label>Image</label>
        <input type='text' name='photo' id='photo' value={form.photo} onChange={setFormParam}/>
      </div>
      <div className={styles.post}>
        <label>Title</label>
        <input type='text' name='title' id='title' required={true} value={form.title} onChange={setFormParam}/>

        <label>Text</label>
        <input type='text' name='text' id='text' required={true} value={form.text} onChange={setFormParam}/>

        <div className={styles.info}>

          <label>Price:</label>
          <input type='number' name='price' id='price' value={form.price} onChange={setFormParam}/>


          <label>Location:
            <input type='text' name='location' id='location' value={form.location} onChange={setFormParam}/>
          </label>

        </div>
        <div className={styles.author}>

          <label>Email:
            <input type='text' name='author' id='author' required={true} value={form.author} onChange={setFormParam}/>
          </label>

          <label>Phone:
            <input type='tel' name='phone' id='phone' value={form.phone} onChange={setFormParam}/>
          </label>


        </div>
        <label>Change status</label>
        <select className='status' name='status' id='status' value={form.status} onChange={setFormParam} required={true}>
          <option value=''>--Please choose an status--</option>
          <option value='published' id='status-1'>Published</option>
          <option value='draft' id='status-2'>Draft</option>
          <option value='closed' id='status-3'>Closed</option>
        </select>
        <button className={styles.submit} type='submit'>Add new post!</button>
      </div>
    </form>
  );
};

Component.propTypes = {
  className: PropTypes.string,
};

export {
  Component as PostAdd,
  Component as PostAddComponent,
};
