import React from 'react';

const TimelineItem = React.forwardRef(({ data, active, ...rest }, ref) => {
  const { date, event, description, image } = data;
  return (
    <div className={`timeline-item ${active ? 'active' : ''}`} ref={ref} {...rest}>
      <div className="timeline-date">{date.toLocaleDateString('default', { year: 'numeric', month: 'short' })}</div>
      <div className="timeline-content">
        <h2>{event}</h2>
        <p>{description}</p>
        {image && <img src={image} alt={event} />}
      </div>
    </div>
  );
});

export default TimelineItem
