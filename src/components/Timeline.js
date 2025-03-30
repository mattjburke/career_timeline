import React, { useEffect, useRef, useState } from 'react';
import TimelineItem from './TimelineItem';
import TimelineBall from './TimelineBall';

// Example timeline data (add as many items as you need)
const timelineData = [
  { year: new Date().getFullYear(), event: "Today", description: "Current event", image: "path/to/imageToday.jpg" },
  { year: 2020, event: "Event A", description: "Description for Event A", image: "path/to/image2020.jpg" },
  { year: 2015, event: "Event B", description: "Description for Event B", image: "path/to/image2015.jpg" },
  { year: 2010, event: "Event C", description: "Description for Event C", image: "path/to/image2010.jpg" },
  { year: 2005, event: "Event D", description: "Description for Event D", image: "path/to/image2005.jpg" },
  { year: 2000, event: "Event E", description: "Description for Event E", image: "path/to/image2000.jpg" },
  { year: 1994, event: "Born", description: "Description for 1994", image: "path/to/image1994.jpg" }
];

function Timeline() {
  const [ballPosition, setBallPosition] = useState(0);
  const itemsContainerRef = useRef(null);
  const timelineLineRef = useRef(null);

  useEffect(() => {
    function handleScroll() {
      if (!itemsContainerRef.current || !timelineLineRef.current) return;
      const scrollTop = itemsContainerRef.current.scrollTop;
      const scrollHeight = itemsContainerRef.current.scrollHeight;
      const clientHeight = itemsContainerRef.current.clientHeight;
      // Calculate progress between 0 and 1.
      const progress = Math.min(Math.max(scrollTop / (scrollHeight - clientHeight), 0), 1);
      const lineHeight = timelineLineRef.current.clientHeight;
      setBallPosition(progress * lineHeight);
    }

    const container = itemsContainerRef.current;
    container.addEventListener("scroll", handleScroll);
    // Initialize position.
    handleScroll();
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="timeline-wrapper">
      <div className="timeline-fixed">
        <div className="timeline-line" ref={timelineLineRef}>
          <div className="timeline-label top">Today</div>
          <div className="timeline-label bottom">1994</div>
          <TimelineBall position={ballPosition} />
        </div>
      </div>
      <div className="timeline-items-container" ref={itemsContainerRef}>
        {timelineData.map((item, index) => (
          <TimelineItem key={index} data={item} />
        ))}
      </div>
    </div>
  );
}

export default Timeline;
