import React from 'react';

function PressRelease(props) {
  return (
    <nav className="box level press-release">
      <div className="level-left">
        <div className="level-item content press-release-title">
          <p>{props.title}</p>
        </div>
      </div>
      <div className="level-right">
        <div className="level-item content">
          <p>{props.published}</p>
        </div>
      </div>
    </nav>
  );
}

export default PressRelease;
