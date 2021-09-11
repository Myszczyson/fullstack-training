import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll, getAllPublished, fetchPublished } from '../../../redux/postsRedux.js';

import styles from './Homepage.module.scss';
import { SearchBar } from '../../features/SearchBar/SearchBar/SearchBar';
import { Button } from '../../common/Button/Button/Button';
import { PostBox } from '../../features/PostBox/PostBox';

const Component = ({className, posts}) => {
  console.log(posts);
  return (
    <div className={clsx(className, styles.root)}>
      <section className={styles.bar}>
        <SearchBar />
        <Button className={styles.postAdd} name={'Add new post here!'}/>
      </section>
      <section className={styles.posts}>
        {posts.map(post => <PostBox key={post.id} {...post} />)}
      </section>
    </div>
  );
};

const mapStateToProps = () => ({
  posts: getAllPublished,
});

const mapDispatchToProps = dispatch => ({
  fetchPublishedPosts: () => dispatch(fetchPublished()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

Component.propTypes = {
  posts: PropTypes.array,
  className: PropTypes.string,
  fetchPublished: PropTypes.func,
};

export {
  Container as Homepage,
  Component as HomepageComponent,
};
