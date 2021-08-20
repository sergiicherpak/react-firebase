import React, { useState, useCallback } from 'react';

import BulkItem from './BulkItem';

const initialPost = {
  postTitle: "",
  postDescription: "",
  postPrice: 0,
  categories: [],
  shippingMethods: [],
  paymentMethods: [],
  creationDate: new Date(),
  postImages: []
};

const Bulk = ({savePosts}) => {
  const [posts, setPosts] = useState([initialPost]);
  const [images, setImages] = useState([]);

  const handleClick = useCallback(() => {
    setPosts([
      ...posts,
      initialPost
    ]);
  }, [posts]);

  const updateImages = useCallback((image, index) => {
    const tmpArray = [...images];
    tmpArray.splice(index, 1, image);
    setImages(tmpArray);
  }, [images]);

  const updatePosts = useCallback((item, index) => {
    const tmpArray = [...posts];
    tmpArray.splice(index, 1, item);
    setPosts(tmpArray);
  }, [posts]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    savePosts(posts, images);
    setPosts([initialPost]);
  }, [posts, images, savePosts]);

  return (
    <form className="bulk" onSubmit={handleSubmit}>
      <div className="bulk-item-wrapper">
        {
          posts.map((item, index) => (
            <BulkItem
              key={index}
              index={index}
              postItem={item}
              updatePosts={updatePosts}
              updateImages={updateImages}
            />
          ))
        }
      </div>
      <input
        type="button"
        value="weiteren hinzufugen"
        className="btn btn--primary btn-add-more"
        onClick={handleClick}
      />
      <input
        type="submit"
        className="btn btn--primary btn-save"
        value="save postings"
      />
    </form>
  );
}

export default Bulk;