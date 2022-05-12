import React from 'react'
import Post from './Post'
import { useContext } from 'react';
import DataContext from '../context/dataContext';

const Feed = ({posts}) => {
  return (
    <>
        {posts.map(post => (
            <Post key={post.id} post={post} />
        ))}
    </>
  )
}

export default Feed