import { format } from "date-fns";

interface TimeColumnProps {
  hours: number[];
}

export const TimeColumn = ({ hours }: TimeColumnProps) => {
  return (
    <div className="bg-surface border-r border-surface-input">
      <div className="h-12" /> {/* Spacer for header alignment */}
      {hours.map((hour) => (
        <div
          key={hour}
          className="h-20 border-b border-surface-input px-2 py-1"
        >
          <span className="text-xs text-text-secondary">
            {format(new Date().setHours(hour, 0), "h:mm a")}
          </span>
        </div>
      ))}
    </div>
  );
};