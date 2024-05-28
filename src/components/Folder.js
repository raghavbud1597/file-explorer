import React, { useState } from "react";

const Folder = ({ explorer, handleInsertNode }) => {
  const [expand, setExpand] = useState(false);
  const [showFolderInput, setShowFolderInput] = useState({
    isVisible: false,
    isFolder: false,
  });

  const handleAddFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowFolderInput({ isVisible: true, isFolder });
  };

  const onAddFolder = (e) => {
    if (e.key === "Enter") {
      handleInsertNode(
        explorer.id,
        { name: e.target.value },
        showFolderInput.isFolder
      );
      setShowFolderInput({ ...showFolderInput, isVisible: false });
    }
  };

  if (explorer.isFolder) {
    return (
      <div className="explorer-wrapper">
        <div
          className="explorer-elements"
          onClick={() => {
            setExpand(!expand);
          }}
        >
          <span>📁 {explorer.name}</span>
          <span>
            <button
              className="add-btn"
              onClick={(e) => handleAddFolder(e, true)}
            >
              + 📁
            </button>
            <button
              className="add-btn"
              onClick={(e) => handleAddFolder(e, false)}
            >
              + 📄
            </button>
          </span>
        </div>
        {showFolderInput.isVisible && (
          <div className="inputContainer">
            <span>{showFolderInput.isFolder ? "📁" : "📄"}</span>
            <input
              className="input-field "
              type="text"
              autoFocus
              onKeyDown={onAddFolder}
              onBlur={() => {
                setShowFolderInput({ ...showFolderInput, isVisible: false });
              }}
            />
          </div>
        )}

        {expand &&
          explorer.items.map((item) => {
            return (
              <div key={item.id}>
                <Folder explorer={item} handleInsertNode={handleInsertNode}/>
              </div>
            );
          })}
      </div>
    );
  } else {
    return (
      <div className="explorer-wrapper">
        <div className="explorer-elements">📄 {explorer.name}</div>
      </div>
    );
  }
};

export default Folder;
