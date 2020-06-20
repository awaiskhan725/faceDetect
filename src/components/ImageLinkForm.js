import React from "react";

const ImageLinkForm = ({ url, onInputChange, onClick }) => {
  return (
    <div className="image-link-form container text-center">
      <h3 className="text-light m-4">
        This App will detect faces in your pictures. Give it a try.
      </h3>
      <div className="url-container pattern-bg container text-center shadow">
        <div className="d-flex p-5">
          <input
            type="text"
            name="url"
            id="url"
            placeholder="Enter url for your photo"
            value={url}
            onChange={onInputChange}
          />
          <button className="detect-btn" onClick={onClick}>
            detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
