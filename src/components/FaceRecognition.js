import React from "react";

const FaceRecognition = ({ imageUrl, facesData }) => {
  return (
    <div className="container d-flex justify-content-center mt-4 p-2">
      <div className="face-detect-container">
        {imageUrl.length > 0 && (
          <img id="image" src={imageUrl} alt="face detect" />
        )}
        {facesData.length > 0 &&
          facesData.map((face, index) => (
            <div
              key={index}
              className="bounding-box"
              style={{
                top: face.top,
                left: face.left,
                bottom: face.bottom,
                right: face.right,
              }}
            ></div>
          ))}
      </div>
    </div>
  );
};

export default FaceRecognition;
