import React, { useEffect, useRef, useState } from 'react';
import TimelineItem from './TimelineItem';
import TimelineBall from './TimelineBall';

// Sample timeline data
const timelineData = [
  { year: new Date().getFullYear(), event: "Event Today", description: "Description for today", image: "path/to/imageToday.jpg" },
  { year: 2020, event: "Event A", description: "Description for Event A", image: "path/to/image2020.jpg" },
  { year: 2015, event: "Event B", description: "Description for Event B", image: "path/to/image2015.jpg" },
  { year: 2010, event: "Event C", description: "Description for Event C", image: "path/to/image2010.jpg" },
  { year: 2005, event: "Event D", description: "Description for Event D", image: "path/to/image2005.jpg" },
  { year: 2000, event: "Event E", description: "Description for Event E", image: "path/to/image2000.jpg" },
  { year: 1994, event: "Born", description: "Description for 1994", image: "path/to/image1994.jpg" }
];

function Timeline() {
  const [ballPosition, setBallPosition] = useState(0);
  const [dateLabel, setDateLabel] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const itemsContainerRef = useRef(null);
  const timelineLineRef = useRef(null);
  const itemsRef = useRef([]);

  // Scroll event for ball position and date interpolation.
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
      
      // Interpolate date between Today and Feb 9, 1994.
      const topDate = new Date(); // Today
      const bottomDate = new Date(1994, 1, 9); // Feb 9, 1994 (months are 0-indexed)
      const interpolatedTime = topDate.getTime() + progress * (bottomDate.getTime() - topDate.getTime());
      const interpolatedDate = new Date(interpolatedTime);
      const label = interpolatedDate.toLocaleString('default', { month: 'short', year: 'numeric' });
      setDateLabel(label);
    }
    const container = itemsContainerRef.current;
    container.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize on mount.
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer to highlight the top-most fully visible timeline item.
  useEffect(() => {
    if (!itemsContainerRef.current) return;
    const observerOptions = {
      root: itemsContainerRef.current,
      threshold: 0.95  // Adjusted threshold: nearly full view.
    };
    const observer = new IntersectionObserver((entries) => {
      // Filter entries that are nearly fully visible.
      const visibleEntries = entries.filter(entry => entry.intersectionRatio >= 0.95);
      let activeEntry = null;
      if (visibleEntries.length > 0) {
        // Choose the one closest to the top.
        activeEntry = visibleEntries.reduce((prev, curr) =>
          prev.boundingClientRect.top < curr.boundingClientRect.top ? prev : curr
        );
      }
      if (activeEntry) {
        const index = Number(activeEntry.target.getAttribute('data-index'));
        setActiveIndex(index);
      }
    }, observerOptions);

    itemsRef.current.forEach(item => {
      if (item) observer.observe(item);
    });
    return () => {
      itemsRef.current.forEach(item => {
        if (item) observer.unobserve(item);
      });
    };
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
          <TimelineItem
            key={index}
            data={item}
            active={index === activeIndex}
            data-index={index}  // Pass the data-index attribute.
            ref={el => itemsRef.current[index] = el}
          />
        ))}
      </div>
    </div>
  );
}

export default Timeline;
