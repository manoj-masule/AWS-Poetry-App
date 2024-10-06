import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../config'; // Import the API_URL

const FileList = () => {
  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    try {
      const response = await axios.get(`${API_URL}/poetry/files`); // Use the API_URL
      setFiles(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (fileName) => {
    try {
      await axios.delete(`${API_URL}/poetry/delete/${fileName}`); // Use the API_URL
      fetchFiles();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div>
      <h2>Uploaded Poetry Files</h2>
      <ul>
        {files.map((file) => (
          <li key={file.fileName}>
            <a href={file.url} target="_blank" rel="noopener noreferrer">{file.fileName}</a>
            <button onClick={() => handleDelete(file.fileName)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
