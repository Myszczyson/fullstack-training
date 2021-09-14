import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import styles from './PostAdd.module.scss';


const Component = ({className}) => {


  return (
    <div className={clsx(className, styles.root)}>
      <div className={styles.imgContainer}>
        <input type='file' accept='.jpg, .png, .gif' />
      </div>
      <div className={styles.post}>
        <input type='text'  />
        <input type='text'  />
        <div className={styles.info}>
          <input type='date'  />
          <input type='number'  />
        </div>
        <div className={styles.author}>
          <input type='text'  />
          <input type='number'  />
          <input type='text'  />
        </div>
        <select className='status' name='status' id='status'>
          <option value='published'  id='status-1'>Published</option>
          <option value='draft'  id='status-1'>Draft</option>
          <option value='closed'  id='status-1'>Closed</option>
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
  Component as PostAdd,
  Component as PostAddComponent,
};
