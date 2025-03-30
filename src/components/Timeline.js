import React, { useEffect, useRef, useState } from 'react';
import TimelineItem from './TimelineItem';
import TimelineBall from './TimelineBall';

// Ensure timelineData is ordered so that the first item corresponds to "Today"
// and the last item corresponds to "1994"
const timelineData = [
  { year: new Date().getFullYear(), event: "Today", description: "Current event", image: "path/to/imageToday.jpg" },
  { year: 2008, event: "Milestone", description: "Description for 2000", image: "path/to/image2000.jpg" },
  { year: 2007, event: "Milestone", description: "Description for 2000", image: "path/to/image2000.jpg" },
  { year: 2006, event: "Milestone", description: "Description for 2000", image: "path/to/image2000.jpg" },
  { year: 2005, event: "Milestone", description: "Description for 2000", image: "path/to/image2000.jpg" },
  { year: 2004, event: "Milestone", description: "Description for 2000", image: "path/to/image2000.jpg" },
  { year: 2003, event: "Milestone", description: "Description for 2000", image: "path/to/image2000.jpg" },
  { year: 2002, event: "Milestone", description: "Description for 2000", image: "path/to/image2000.jpg" },
  { year: 2001, event: "Milestone", description: "Description for 2000", image: "path/to/image2000.jpg" },
  { year: 2000, event: "Milestone", description: "Description for 2000", image: "path/to/image2000.jpg" },
  { year: 1994, event: "Born", description: "Description for 1994", image: "path/to/image1994.jpg" }
];

function Timeline() {
  const [ballPosition, setBallPosition] = useState(0);
  const containerRef = useRef(null);
  const timelineLineRef = useRef(null);

  useEffect(() => {
    function handleScroll() {
      if (!containerRef.current || !timelineLineRef.current) return;

      // Get the vertical scroll progress through the timeline container.
      const containerOffsetTop = containerRef.current.offsetTop;
      const containerScrollHeight = containerRef.current.scrollHeight;
      const containerClientHeight = containerRef.current.clientHeight;
      
      // Calculate progress as a value between 0 and 1.
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const progress = Math.min(
        Math.max((scrollY - containerOffsetTop) / (containerScrollHeight - containerClientHeight), 0),
        1
      );
      
      // Use the progress to determine the ball's position on the timeline line.
      const lineHeight = timelineLineRef.current.clientHeight;
      setBallPosition(progress * lineHeight);
    }

    window.addEventListener('scroll', handleScroll);
    // Call once initially to set the ball position.
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="timeline-container" ref={containerRef}>
      <div className="timeline-line" ref={timelineLineRef}>
        {/* Top and bottom labels */}
        <div className="timeline-label top">Today</div>
        <div className="timeline-label bottom">1994</div>
        <TimelineBall position={ballPosition} />
      </div>
      <div className="timeline-items">
        {timelineData.map((item, index) => (
          <TimelineItem key={index} data={item} />
        ))}
      </div>
    </div>
  );
}

export default Timeline;
