interface StatsBadgeProps {
  value: string;
  label: string;
}

const StatsBadge = ({ value, label }: StatsBadgeProps) => (
  <div className="absolute -bottom-6 -left-6 bg-mint-light/80 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-mint/20 animate-fade-up z-20" style={{ animationDelay: "0.3s" }}>
    <p className="text-mint-dark text-4xl font-bold">{value}</p>
    <p className="text-gray-dark/90">{label}</p>
  </div>
);

export default StatsBadge;