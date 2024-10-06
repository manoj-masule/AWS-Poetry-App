import React from 'react';
import UploadFile from './components/UploadFile';
import FileList from './components/FileList';

const App = () => {
  return (
    <div>
      <h1>Poetry Sharing App</h1>
      <UploadFile />
      <FileList />
    </div>
  );
};

export default App;
