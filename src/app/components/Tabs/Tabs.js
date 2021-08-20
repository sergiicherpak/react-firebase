import React, { useState, useCallback } from "react";

const Tabs = ({ defaultIndex = 1, children }) => {
  const [bindIndex, setBindIndex] = useState(defaultIndex);

  const changeTab = useCallback(newIndex => {
    setBindIndex(newIndex);
  }, []);

  return (
    <div className="container tabs-wrapper">
      <div className="tab-menu">
        {children.map(({ props: { index, title } }) => (
          <div
            key={`tab-${index}`}
            onClick={() => changeTab(index)}
            className={`tab-item${bindIndex === index ? " focus" : ""}`}
          >
            <p className="title">{title}</p>
          </div>
        ))}
      </div>
      <div className="tab-view">
        {children.map(({ props: { index, children } }) => (
          <div
            index={index}
            className={`tab-content ${bindIndex === index ? "selected" : ""}`}
            key={`tab-content-${index}`}
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
