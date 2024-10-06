import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../config';

const FileList = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState('');

  const fetchFiles = async () => {
    try {
      const response = await axios.get(`${API_URL}/poetry/files`);
      setFiles(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (fileName) => {
    try {
      await axios.delete(`${API_URL}/poetry/delete/${fileName}`);
      fetchFiles();
      setSelectedFile(null); // Reset selected file on deletion
      setFileContent(''); // Clear content on deletion
    } catch (error) {
      console.error(error);
    }
  };

  const handlePreview = async (file) => {
    try {
      const response = await axios.get(file.url);
      setFileContent(response.data); // Set file content for preview
      setSelectedFile(file.fileName); // Set selected file name
    } catch (error) {
      console.error('Error fetching file content:', error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [files]);

  return (
    <div className="mt-5">
      <h2 className="text-2xl font-bold mb-4">Uploaded Poetry Files</h2>
      <ul className="space-y-3">
        {files.map((file) => (
          <li key={file.fileName} className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow">
            <a
              href="#"
              onClick={() => handlePreview(file)}
              className="text-blue-600 hover:underline"
            >
              {file.fileName}
            </a>
            <button
              onClick={() => handleDelete(file.fileName)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Preview Section */}
      {selectedFile && (
        <div className="mt-6 p-4 border border-gray-300 rounded-md shadow-md">
          <h3 className="text-xl font-semibold">Preview of {selectedFile}</h3>
          <div className="h-40 overflow-hidden border border-gray-300 p-2 rounded-md">
            <pre className="whitespace-pre-wrap max-h-full overflow-y-auto">
              {fileContent}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileList;
