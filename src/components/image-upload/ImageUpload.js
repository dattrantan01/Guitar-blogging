import React from "react";

const ImageUpload = ({ onChange, name, image, deleteImage }) => {
  return (
    <div className="w-full max-w-[500px] h-[300px] bg-green-300 relative">
      {image && (
        <div
          className="cursor-pointer absolute w-full h-full top-0 left-0 z-20 text-transparent hover:text-white hover:bg-opacity-10 hover:bg-black font-bold text-lg flex justify-center items-center"
          onClick={deleteImage}
        >
          <span>Choose another pic</span>
        </div>
      )}
      <label
        htmlFor="file"
        className="w-full h-full z-10 absolute top-0 left-0 cursor-pointer"
      >
        {image ? (
          <img src={image} alt="" className="w-full h-full object-cover" />
        ) : (
          <img src="/guitar.svg" alt="" className="w-full h-full" />
        )}
      </label>
      <input
        id="file"
        type="file"
        name={name}
        className="hidden"
        onChange={onChange}
      />
    </div>
  );
};

export default ImageUpload;
