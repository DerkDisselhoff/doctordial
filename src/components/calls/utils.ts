export const getSentimentColor = (sentiment: string) => {
  switch (sentiment?.toLowerCase()) {
    case 'positive':
      return 'bg-green-500/20 border-green-500/30 text-green-500';
    case 'negative':
      return 'bg-red-500/20 border-red-500/30 text-red-500';
    case 'neutral':
      return 'bg-blue-500/20 border-blue-500/30 text-blue-500';
    default:
      return 'bg-gray-500/20 border-gray-500/30 text-gray-500';
  }
};

export const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'completed':
      return 'bg-green-500/20 border-green-500/30 text-green-500';
    case 'in progress':
      return 'bg-blue-500/20 border-blue-500/30 text-blue-500';
    case 'scheduled':
      return 'bg-purple-500/20 border-purple-500/30 text-purple-500';
    case 'missed':
      return 'bg-red-500/20 border-red-500/30 text-red-500';
    default:
      return 'bg-gray-500/20 border-gray-500/30 text-gray-500';
  }
};

export const getUrgencyColor = (urgency: string) => {
  switch (urgency) {
    case 'U1':
      return 'bg-red-500/20 border-red-500/30 text-red-500';
    case 'U2':
      return 'bg-orange-500/20 border-orange-500/30 text-orange-500';
    case 'U3':
      return 'bg-yellow-500/20 border-yellow-500/30 text-yellow-500';
    case 'U4':
      return 'bg-blue-500/20 border-blue-500/30 text-blue-500';
    case 'U5':
      return 'bg-green-500/20 border-green-500/30 text-green-500';
    default:
      return 'bg-gray-500/20 border-gray-500/30 text-gray-500';
  }
};