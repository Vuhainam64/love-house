// TabsComponent.jsx
import React, { useState, useEffect, useRef, useMemo } from 'react';

const TabsComponent = ({ items, initialTabTitle, onTabChange, defaultTabIndex }) => {
  const [selectedTab, setSelectedTab] = useState(defaultTabIndex || 0);
  const [currentContent, setCurrentContent] = useState(initialTabTitle);
  const firstBtnRef = useRef();

  useEffect(() => {
    firstBtnRef.current.focus();
  }, []);

  const memoizedItems = useMemo(() => items, [items]);

  useEffect(() => {
    const selectedTabTitle = memoizedItems[selectedTab]?.title;
    if (currentContent !== selectedTabTitle) {
      onTabChange(selectedTab);
      setCurrentContent(selectedTabTitle);
      // Make the server call if needed
      if (selectedTab === defaultTabIndex) {
        fetchData(selectedTab);
      }
    }
  }, [selectedTab, memoizedItems, currentContent, onTabChange, defaultTabIndex]);

  const fetchData = (index) => {
    // Add your data fetching logic here
    console.log(`Fetching data for tab ${index}`);
  };

  return (
    <div className='pl-4 flex items-center'>
      <div className='max-w-md flex flex-col gap-y-2 w-full'>
        <div className='bg-green-600 rounded-xl flex justify-between items-center font-bold text-white'>
          {memoizedItems.map((item, index) => (
            <button
              ref={index === 0 ? firstBtnRef : null}
              key={index}
              onClick={() => {
                setSelectedTab(index);
                onTabChange(index); // Call the provided callback on tab change
                if (index !== defaultTabIndex) {
                  fetchData(index);
                }
              }}
              className={`outline-none w-full p-2 hover:bg-blue-300 rounded-xl text-center focus:ring-2 focus:bg-white focus:text-baseGreen ${
                selectedTab === index ? 'ring-2 bg-white text-baseGreen' : ''
              } `}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabsComponent;
