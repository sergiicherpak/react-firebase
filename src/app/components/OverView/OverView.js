import React, { lazy, Suspense, useCallback } from 'react';

const OverViewItem = lazy(() => import('./OverViewItem'));

const OverView = ({ data, collection, getData, mode }) => {
  const clearItem = useCallback((index) => {
    collection.doc(data[index].postID).delete().then(() => {
      getData();
    })
  }, [collection, data, getData]);

  const repost = useCallback((index) => {

  }, []);

  return (
    <div className="overview">
      <Suspense fallback={<h1 className="loading">Loading posts...</h1>}>
      {
        data.map(
          (item, index) =>
            <OverViewItem
              key={`overview-item-${index}`}
              item={item}
              index={index}
              clearItem={clearItem}
              repost={repost}
              mode={mode}
            />              
        )
      }
      </Suspense>
    </div>
  );
}

export default OverView;