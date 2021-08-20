import React, { useState, useEffect } from 'react';

const OverViewItem = ({ item, index, clearItem, repost, mode }) => {
  const [creationDate, setCreationDate] = useState("");
  const [creationTime, setCreationTime] = useState("");

  useEffect(() => {
    if (item.creationDate && typeof item.creationDate === 'string') {
      let arr = item.creationDate.split(" ");
      if (arr.length > 1) {
        setCreationDate(arr[0].replaceAll("-", "."));
        arr = arr[1].split(".");
        if (arr.length > 1)
          setCreationTime(arr[0].replaceAll(":", ".").substr(0, 5));
      }
    }
  }, [item]);

  return (
    <div className="overview-item">
      <div className="img-bottle">
        <img src={item.postImages && item.postImages.length > 0 ? item.postImages[0] : ""} alt="bottle" />
      </div>
      <div className="overview-item-content">
        <div className="overview-item-content-element overview-item-content-element-left">
          <button type="button" className="btn btn--primary btn-cta">
            <svg className="icon">
              <use xlinkHref="/img/sprite.svg#basket" />
            </svg>
            Kaufen
          </button>
          <p className="name">Beschreibung:</p>
        </div>
        <div className="overview-item-content-element overview-item-content-element-right">
          <h3 className="title">{item.postTitle}</h3>
          <p className="description">{item.postDescription}</p>
        </div>
      </div>
      <div className="overview-item-date">
        <p>{ creationDate }</p>
      </div>
      <div className="overview-item-time">
        <p>{ creationTime }</p>
      </div>
      <div className="overview-item-button">
        {
          mode === 1 ?
          <button type="button" className="btn btn--primary btn-cta" onClick={() => clearItem(index)}>löschen</button> :
          <button type="button" className="btn btn--primary btn-cta" onClick={() => repost(index)}>repost</button>
        }
      </div>
    </div>
  );
}

export default OverViewItem;