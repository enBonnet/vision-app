import axios from "axios";

const url = "http://127.0.0.1:8000";

export async function uploadImage(data) {
  const config = {
    headers: {
      "content-type": "multipart/form-data"
    }
  };
  const req = await axios.post(`${url}/image`, data, config);
  return req.data;
}

export async function getDataFromImage(imageUrl) {
  const req = await axios.post(`${url}/vision`, { url: imageUrl });
  return req.data;
}
