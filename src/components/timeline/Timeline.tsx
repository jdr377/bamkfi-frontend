import React from 'react';
import './Timeline.css';

const events = [
  { date: '21-4-2024', description: 'BAMK token deployed with 6.25% mint' },
  { date: '21-5-2024', description: 'UTXO Mgmt add $1million to NUSD TVL' },
  { date: '15-6-2024', description: 'NUSD TVL over $4million' },
  { date: '3-7-2024', description: 'BTC/NUSD LP TVL on Dotswap over 10 BTC' },
  { date: 'Future', description: 'NUSD as base pairs on BTCFi ecosystem' },
  { date: 'Future', description: 'Delta-neutral hedging on perp dex' },
];

const Timeline = () => {
  return (
    <div className="timeline-container">
      <ul className="timeline">
        {events.map((event, index) => (
          <li key={index} className={`timeline-event ${index % 2 === 0 ? 'bottom' : 'top'}`}>
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <time>{event.date}</time>
              <p>{event.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Timeline;
