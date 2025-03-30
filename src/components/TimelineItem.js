import React from 'react';

function TimelineItem({ data }) {
  const { year, event, description, image } = data;
  return (
    <div className="timeline-item">
      <div className="timeline-date">{year}</div>
      <div className="timeline-content">
        <h2>{event}</h2>
        <p>{description}</p>
        {image && <img src={image} alt={event} />}
      </div>
    </div>
  );
}

export default TimelineItem;
