import React, { useState } from 'react';
import axios from 'axios';
import API_URL from '../config';

const UploadFile = ({ fetchFiles }) => { // Accept fetchFiles as a prop
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post(`${API_URL}/poetry/upload`, formData);
      alert('File uploaded successfully');
      fetchFiles(); // Call fetchFiles to refresh the file list
      setFile(null); // Clear the file input
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file}>Upload</button>
    </div>
  );
};

export default UploadFile;
