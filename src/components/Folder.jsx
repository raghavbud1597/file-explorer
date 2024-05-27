import { useState } from "react";

const Folder = ({ explorer }) => {
  const [expand, setExpand] = useState(false);
  if(explorer.isFolder){
    return (
    <div>
      <div onClick={()=>setExpand(!expand)} className="parent-folders">📁 {explorer.name}</div>
      <div style={{display:expand ? 'block': 'none'}} className="child-folders">
        {explorer.items.map((item) => {
          return <Folder key={item.id} explorer={item} />;
        })}
      </div>
    </div>
  );} else {
    return (
    <div>
      <div className="parent-folders">📄 {explorer.name}</div>
    </div>
  );
  }
  
};

export default Folder;
