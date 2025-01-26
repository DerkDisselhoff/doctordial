export const getSentimentColor = (sentiment: string) => {
  switch (sentiment?.toLowerCase()) {
    case 'positive':
      return 'bg-mint-light border-mint text-mint-dark';
    case 'negative':
      return 'bg-red-500/20 border-red-500/30 text-red-500';
    case 'neutral':
      return 'bg-gray-muted border-gray-light text-gray';
    default:
      return 'bg-gray-muted border-gray-light text-gray';
  }
};

export const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'completed':
      return 'bg-mint-light border-mint text-mint-dark';
    case 'in progress':
      return 'bg-sage-light border-sage text-sage-dark';
    case 'scheduled':
      return 'bg-emerald-light border-emerald text-emerald-dark';
    case 'missed':
      return 'bg-red-500/20 border-red-500/30 text-red-500';
    default:
      return 'bg-gray-muted border-gray-light text-gray';
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
      return 'bg-mint-light border-mint text-mint-dark';
    case 'U5':
      return 'bg-sage-light border-sage text-sage-dark';
    default:
      return 'bg-gray-muted border-gray-light text-gray';
  }
};