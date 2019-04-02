import React, { useState, useEffect } from "react";
import { Image } from "cloudinary-react";
import ReactJson from "react-json-view";

import { uploadImage, getDataFromImage } from "../services/BackendApi";

export default function Content() {
  const [image, setImage] = useState("");
  const [imagePublicId, setImagePublicId] = useState("");
  const [description, setDescription] = useState(null);

  async function getImageData() {
    if (image) {
      const describe = await getDataFromImage(image);
      setDescription(describe);
    }
  }

  useEffect(() => {
    getImageData();
  }, [image]);

  const onChange = async e => {
    const files = Array.from(e.target.files);

    const formData = new FormData();

    files.forEach((file, i) => {
      formData.append(i, file);
    });

    const upload = await uploadImage(formData);
    const { public_id, secure_url } = upload;
    setImage(secure_url);
    setImagePublicId(public_id);
  };

  return (
    <div className="content">
      <div className="load">
        <p>Cargar una imagen y te digo que veo</p>
        <form>
          <input type="file" id="image" onChange={onChange} />
          <label htmlFor="image">Selecciona una imagen</label>
        </form>
      </div>
      <div className="loaded">
        <Image cloudName="enbonnet" publicId={imagePublicId} width="500" />
        {description ? <ReactJson theme="monokai" src={description} /> : ""}
      </div>
    </div>
  );
}
