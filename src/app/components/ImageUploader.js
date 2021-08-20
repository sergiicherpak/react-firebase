import React, { useState, useCallback, useEffect, useRef } from "react";
import { storage } from "../firebase";

const ImageUploader = ({ uploadImageUrl }) => {
  const fileInput = useRef(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const handleFireBaseUpload = useCallback(imageAsFile => {
    // async magic goes here...
    if (imageAsFile === '') {
      console.error(`not an image, the image file is a ${typeof (imageAsFile)}`)
    }
    const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile)
    //initiates the firebase side uploading 
    uploadTask.on('state_changed',
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot)
      }, (err) => {
        //catches the errors
        console.log(err)
      }, () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        storage.ref('images').child(imageAsFile.name).getDownloadURL()
          .then(fireBaseUrl => {
            uploadImageUrl(fireBaseUrl);
          })
      })
  }, [uploadImageUrl]);

  const handleFile = useCallback(file => {
    //you can carry out any file validations here...
    handleFireBaseUpload(file);
    setPreviewUrl(URL.createObjectURL(file));
  }, [handleFireBaseUpload]);
  
  const handleOndragOver = useCallback(event => {
    event.preventDefault();
  }, []);

  const handleOndrop = useCallback(event => {
    //prevent the browser from opening the image
    event.preventDefault();
    event.stopPropagation();
    //let's grab the image file
    const imageFile = event.dataTransfer.files[0];
    handleFile(imageFile);
  }, [handleFile]);

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(previewUrl);
    }
  }, [previewUrl]);
  
  return (
    <div className="drop-zone-wrapper">
      <div
        className="drop-zone"
        onDragOver={handleOndragOver}
        onDrop={handleOndrop}
        onClick={() => fileInput.current.click()}
      >
        {
          !previewUrl &&
          <p>hinzufügen <br/>---<br/> drag and drop</p>
        }
        <svg className="icon">
          <use xlinkHref="/img/sprite.svg#drag_drop_back" />
        </svg>
        <input
          type="file"
          accept='image/*'
          ref={fileInput} hidden
          onChange={e => handleFile(e.target.files[0])}
        />
        {previewUrl && <img src={previewUrl} alt='bottle' className="image" />}
      </div>
    </div>
  );
}
export default ImageUploader;