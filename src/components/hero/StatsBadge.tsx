interface StatsBadgeProps {
  value: string;
  label: string;
}

const StatsBadge = ({ value, label }: StatsBadgeProps) => (
  <div className="absolute -bottom-10 -left-10 bg-forest-light p-6 rounded-xl shadow-xl border border-mint/10 animate-fade-up" style={{ animationDelay: "0.3s" }}>
    <p className="text-mint text-4xl font-bold">{value}</p>
    <p className="text-white/80">{label}</p>
  </div>
);

export default StatsBadge;