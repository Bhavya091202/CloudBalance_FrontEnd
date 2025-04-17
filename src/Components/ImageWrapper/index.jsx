import React from "react";

const ImageWrapper = ({logo, logoName, imgClass, imgContainerClass}) => {
  return (
    <div className={imgContainerClass}>
      <img
        src={logo}
        alt={logoName}
        className={imgClass}
      />
    </div>
  );
};

export default ImageWrapper;
