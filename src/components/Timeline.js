import React, { useEffect, useRef, useState } from 'react';
import TimelineItem from './TimelineItem';
import TimelineBall from './TimelineBall';

// Example timeline data (add as many items as needed)
const timelineData = [
  { year: 2023, event: "Event A", description: "Description for Event A", image: "path/to/image2023.jpg" },
  { year: 2020, event: "Event B", description: "Description for Event B", image: "path/to/image2020.jpg" },
  { year: 2015, event: "Event C", description: "Description for Event C", image: "path/to/image2015.jpg" },
  { year: 2010, event: "Event D", description: "Description for Event D", image: "path/to/image2010.jpg" },
  { year: 2005, event: "Event E", description: "Description for Event E", image: "path/to/image2005.jpg" },
  { year: 2000, event: "Event F", description: "Description for Event F", image: "path/to/image2000.jpg" },
  { year: 1994, event: "Born", description: "Description for 1994", image: "path/to/image1994.jpg" }
];

function Timeline() {
  const [ballPosition, setBallPosition] = useState(0);
  const [dateLabel, setDateLabel] = useState('');
  const itemsContainerRef = useRef(null);
  const timelineLineRef = useRef(null);

  useEffect(() => {
    function handleScroll() {
      if (!itemsContainerRef.current || !timelineLineRef.current) return;
      const scrollTop = itemsContainerRef.current.scrollTop;
      const scrollHeight = itemsContainerRef.current.scrollHeight;
      const clientHeight = itemsContainerRef.current.clientHeight;
      // Calculate progress (0 at top, 1 at bottom)
      const progress = Math.min(Math.max(scrollTop / (scrollHeight - clientHeight), 0), 1);
      
      // Update ball position along the fixed timeline line
      const lineHeight = timelineLineRef.current.clientHeight;
      setBallPosition(progress * lineHeight);
      
      // Interpolate between Today and Feb 9, 1994.
      const topDate = new Date(); // Today (current date)
      const bottomDate = new Date(1994, 1, 9); // February 9, 1994 (months are 0-indexed)
      const interpolatedTime = topDate.getTime() + progress * (bottomDate.getTime() - topDate.getTime());
      const interpolatedDate = new Date(interpolatedTime);
      
      // Format to month and year (e.g., "Feb 2020")
      const label = interpolatedDate.toLocaleString('default', { month: 'short', year: 'numeric' });
      setDateLabel(label);
    }

    const container = itemsContainerRef.current;
    container.addEventListener("scroll", handleScroll);
    // Initialize on mount.
    handleScroll();
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

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
          <TimelineItem key={index} data={item} />
        ))}
      </div>
    </div>
  );
}

export default Timeline;
