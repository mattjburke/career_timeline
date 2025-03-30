import React from 'react';

function TimelineBall({ position, dateLabel }) {
  return (
    <div className="timeline-ball-wrapper" style={{ top: position }}>
      <div className="timeline-ball"></div>
      <div className="timeline-ball-label">{dateLabel}</div>
    </div>
  );
}

export default TimelineBall;
