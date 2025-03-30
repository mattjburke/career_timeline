import React from 'react';
import TimelineItem from './TimelineItem';
import TimelineBall from './TimelineBall';

// Sample data; you can replace or expand this with real events.
const timelineData = [
  { year: 1994, event: "Born", description: "Description for 1994", image: "path/to/image1994.jpg" },
  { year: 2000, event: "Milestone", description: "Description for 2000", image: "path/to/image2000.jpg" },
  // Add additional events as needed.
  { year: new Date().getFullYear(), event: "Today", description: "Current event", image: "path/to/imageToday.jpg" }
];

function Timeline() {
  return (
    <div className="timeline-container">
      <div className="timeline-line">
        {/* The ball will animate along this line */}
        <TimelineBall />
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
