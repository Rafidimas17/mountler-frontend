import React, { useEffect, useState } from "react";

const Tabs = ({ tabsData, display, handleActive }) => {
  const [activeTabs, setActiveTabs] = useState(0);
  const handleClick = (index) => {
    setActiveTabs(index);
    handleActive(activeTabs);
  };
  useEffect(() => {
    // Inisialisasi nilai activeTabs ke 0 saat komponen pertama kali dimuat
    setActiveTabs(0);
  }, []);
  return (
    <div className="container px-0">
      <div className={`tabs ${display} py-3`}>
        {tabsData.map((item, index) => (
          <div
            key={index}
            className={`tab-${index === activeTabs ? "active" : "inactive"}`}
            onClick={() => handleClick(index)}>
            {item.title}
          </div>
        ))}
      </div>
      {tabsData[activeTabs].content}
    </div>
  );
};
export default Tabs;
