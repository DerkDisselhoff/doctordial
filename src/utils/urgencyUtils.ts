export const getUrgencyColor = (score: string) => {
  switch (score) {
    case "U1": return "bg-red-500/10 border border-red-500/30 text-red-500";
    case "U2": return "bg-orange-500/10 border border-orange-500/30 text-orange-500";
    case "U3": return "bg-yellow-500/10 border border-yellow-500/30 text-yellow-500";
    case "U4": return "bg-mint/10 border border-mint/30 text-mint";
    case "U5": return "bg-blue-dark/10 border border-blue-dark/30 text-blue-dark";
    default: return "bg-gray-500/10 border border-gray-500/30 text-gray-500";
  }
};