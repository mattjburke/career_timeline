import React, { useEffect, useRef, useState } from 'react';
import TimelineItem from './TimelineItem';
import TimelineBall from './TimelineBall';

// Sample timeline data (sorted descending: first is most recent, last is oldest)
const timelineData = [
  { date: new Date(), event: "Event Today", description: "Description for today", image: "path/to/imageToday.jpg" },
  { date: new Date("2020-06-15"), event: "Event A", description: "Description for Event A", image: "path/to/image2020.jpg" },
  { date: new Date("2015-09-10"), event: "Event B", description: "Description for Event B", image: "path/to/image2015.jpg" },
  { date: new Date("2010-04-20"), event: "Event C", description: "Description for Event C", image: "path/to/image2010.jpg" },
  { date: new Date("2005-11-05"), event: "Event D", description: "Description for Event D", image: "path/to/image2005.jpg" },
  { date: new Date("2000-08-25"), event: "Event E", description: "Description for Event E", image: "path/to/image2000.jpg" },
  { date: new Date("1994-02-09"), event: "Born", description: "Description for 1994", image: "path/to/image1994.jpg" }
];

function Timeline() {
  const [ballPosition, setBallPosition] = useState(0);
  const [dateLabel, setDateLabel] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const itemsContainerRef = useRef(null);
  const timelineLineRef = useRef(null);
  const itemsRef = useRef([]);

  // This effect determines which timeline item is highlighted based on scroll.
  useEffect(() => {
    function handleScroll() {
      const container = itemsContainerRef.current;
      if (!container) return;
      const scrollTop = container.scrollTop;
      const clientHeight = container.clientHeight;
      
      let candidate = null;
      let minTop = Infinity;
      // Iterate over each item to find the top-most one that is fully in view.
      itemsRef.current.forEach((item, index) => {
        if (!item) return;
        const itemTop = item.offsetTop;
        const itemBottom = itemTop + item.offsetHeight;
        // Consider an item fully in view if its entire height is within the container.
        if (itemTop >= scrollTop && itemBottom <= scrollTop + clientHeight) {
          if (itemTop < minTop) {
            minTop = itemTop;
            candidate = index;
          }
        }
      });
      if (candidate !== null) {
        setActiveIndex(candidate);
      }
    }

    const container = itemsContainerRef.current;
    container.addEventListener('scroll', handleScroll);
    // Initialize active item on mount.
    handleScroll();
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // This effect updates the ball position and its date label based on the highlighted item.
  useEffect(() => {
    if (!timelineLineRef.current || activeIndex === null) return;
    const highlightedItem = timelineData[activeIndex];
    if (!highlightedItem) return;
    
    // Define top (most recent) and bottom (oldest) dates based on your data.
    const topDate = timelineData[0].date; 
    const bottomDate = timelineData[timelineData.length - 1].date;
    // Calculate progress: 0 means at top, 1 means at bottom.
    const progress = (topDate.getTime() - highlightedItem.date.getTime()) / (topDate.getTime() - bottomDate.getTime());
    
    const lineHeight = timelineLineRef.current.clientHeight;
    setBallPosition(progress * lineHeight);
    
    // Format the highlighted date as "Mon YYYY" (e.g., "Feb 1994")
    const label = highlightedItem.date.toLocaleString('default', { month: 'short', year: 'numeric' });
    setDateLabel(label);
  }, [activeIndex]);

  return (
    <div className="timeline-wrapper">
      <div className="timeline-fixed">
        <div className="timeline-line" ref={timelineLineRef}>
          <div className="timeline-label top">Today</div>
          <div className="timeline-label bottom">Feb 9, 1994</div>
          <TimelineBall position={ballPosition} dateLabel={dateLabel} />
        </div>
      </div>
      <div className="timeline-items-container" ref={itemsContainerRef}>
        {timelineData.map((item, index) => (
          <TimelineItem
            key={index}
            data={item}
            active={index === activeIndex}
            data-index={index}
            ref={el => itemsRef.current[index] = el}
          />
        ))}
      </div>
    </div>
  );
}

export default Timeline;
