import React from 'react';
import { IncidentCard } from './IncidentCard';

export const IncidentList = ({ incidents = [], selectedIncident, onSelectIncident }) => {
  const feedItems = [
    { id: "1", title: "Heavy Rain", location: "Jaipur, Rajasthan", timeAgo: "2 mins ago", status: "Verified" },
    { id: "2", title: "Flood Alert", location: "Patna, Bihar", timeAgo: "5 mins ago", status: "Under Review" },
    { id: "3", title: "Heavy Rain", location: "Mumbai, Maharashtra", timeAgo: "7 mins ago", status: "Verified" },
    { id: "4", title: "Cyclone", location: "Visakhapatnam, Andhra Pradesh", timeAgo: "12 mins ago", status: "Under Review" },
    { id: "5", title: "Heatwave", location: "Nagpur, Maharashtra", timeAgo: "18 mins ago", status: "Unverified" },
    { id: "6", title: "Flood Alert", location: "Kolkata, West Bengal", timeAgo: "22 mins ago", status: "Verified" },
    { id: "7", title: "Heavy Rain", location: "Chennai, Tamil Nadu", timeAgo: "25 mins ago", status: "Verified" },
    { id: "8", title: "Active Incident", location: "Guwahati, Assam", timeAgo: "32 mins ago", status: "Verified" }
  ];

  return (
    <div className="space-y-2 overflow-y-auto pr-1 h-full">
      {feedItems.map((item) => (
        <IncidentCard
          key={item.id}
          incident={item}
          isSelected={selectedIncident?.id === item.id}
          onSelect={onSelectIncident}
        />
      ))}
    </div>
  );
};
