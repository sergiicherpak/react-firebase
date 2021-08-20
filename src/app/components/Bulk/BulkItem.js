import React, { useState, useCallback, useEffect } from 'react';
import DateTimePicker from 'react-datetime-picker';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import ImageUploader from '../ImageUploader';

const categoryOptions = [
  { label: "#weinpakete", value: "#weinpakete" },
  { label: "#rotwein", value: "#rotwein" },
  { label: "#rosewein", value: "#rosewein" },
  { label: "#süsswein", value: "#süsswein" },
  { label: "#naturwein", value: "#naturwein" },
  { label: "#sherry", value: "#sherry" },
  { label: "#weisswein", value: "#weisswein" },
  { label: "#champagner", value: "#champagner" },
  { label: "#likörwein", value: "#likörwein" },
  { label: "#portwein", value: "#portwein" },
  { label: "#brandy", value: "#brandy" },
  { label: "#zubehör", value: "#zubehör" }
];

const shippingOptions = [
  { label: "bis 3 Flaschen", value: "UpTo3" },
  { label: "bis 6 Flaschen", value: "UpTo6" },
  { label: "bis 12 Flaschen", value: "UpTo12" },
  { label: "bis 18 Flaschen", value: "UpTo18" },
  { label: "eigener Versand", value: "OwnOptions" },
];

const paymentOptions = [
  { label: "Sofort Überweisung", value: "BankTransfer" },
  { label: "Paypal", value: "Paypal" },
  { label: "Flaschenpiration Gold", value: "Creditcard" }
];

const animatedComponents = makeAnimated();

const BulkItem = ({postItem, index, updatePosts}) => {
  const [post, setPost] = useState(postItem);

  useEffect(() => {
    setPost(postItem);
  }, [postItem]);

  const uploadImageUrl = useCallback(imageUrl => {
    const tmpPost = { ...post, postImages: [imageUrl] };
    updatePosts(tmpPost, index);
  }, [updatePosts, index, post]);

  const handleChange = useCallback((e) => {
    const value = e.target.value;
    let tmpPost = {};
    switch (e.target.name) {
      case 'input-title':
        tmpPost = {
          ...post,
          postTitle: value
        };
        break;
      case 'input-description':
        tmpPost = {
          ...post,
          postDescription: value
        };
        break;
      case 'input-price':
        tmpPost = {
          ...post,
          postPrice: value
        };
        break;
      default:
        break;
    }
    updatePosts(tmpPost, index);
  }, [post, index, updatePosts]);

  const handleChangeDateTime = useCallback((value) => {
    const dateTime = new Date(value);
    const tmpPost = {
      ...post,
      creationDate: dateTime
    };
    updatePosts(tmpPost, index);
  }, [post, index, updatePosts]);

  const handleSelectChange = useCallback((name, value) => {
    let tmpPost = {};

    switch (name) {
      case 'category':
        tmpPost = {
          ...post,
          categories: value
        };
        break;
      case 'shipping':
        tmpPost = {
          ...post,
          shippingMethods: value
        };
        break;
      case 'payment':
        tmpPost = {
          ...post,
          paymentMethods: value
        };
        break;
      default:
        break;
    }
    updatePosts(tmpPost, index);
  }, [post, index, updatePosts]);

  return (
    <div className="bulk-item">
      <ImageUploader uploadImageUrl={uploadImageUrl} />
      <div className="bulk-item-title">
        <input
          type="text"
          className="input"
          name="input-title"
          placeholder="title / Titel"
          value={post.postTitle}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          className="input"
          name="input-description"
          placeholder="description / Beschreibung"
          value={post.postDescription}
          onChange={handleChange}
          required
        />
      </div>
      <div className="bulk-item-category">
        <div className="bulk-item-category-left">
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            value={post.categories}
            isMulti
            options={categoryOptions}
            onChange={value => handleSelectChange("category", value)}
         />
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            value={post.shippingMethods}
            isMulti
            options={shippingOptions}
            onChange={value => handleSelectChange("shipping", value)}
          />
          <Select
            name="payment"
            closeMenuOnSelect={false}
            components={animatedComponents}
            value={post.paymentMethods}
            isMulti
            options={paymentOptions}
            onChange={value => handleSelectChange("payment", value)}
          />
        </div>
        <div className="bulk-item-category-right">
          <div className="price">
            <span>Preis ohne Versandkosten:</span>
            <input
              type="number"
              className="input-price"
              name="input-price"
              value={post.postPrice}
              onChange={handleChange}
              placeholder="Euro"
            />
          </div>
          <DateTimePicker
            name="date-time"
            onChange={handleChangeDateTime}
            value={post.creationDate}
          />
        </div>
      </div>
    </div>
  );
}

export default BulkItem;