import React from 'react';
import UploadFile from './components/UploadFile';
import FileList from './components/FileList';

const App = () => {
  return (
    <div className="container mx-auto p-5">
      <h1 className="text-4xl font-bold mb-6 text-center">Poetry Sharing App</h1>
      <UploadFile />
      <FileList />
    </div>
  );
};

export default App;
