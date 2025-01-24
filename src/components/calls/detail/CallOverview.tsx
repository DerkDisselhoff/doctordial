import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Clock, MessageCircle, User, ThumbsUp, AlertCircle, Calendar } from "lucide-react";
import { CallLog } from "../CallDetail";
import { getStatusColor, getSentimentColor, getUrgencyColor } from "../utils";

interface CallOverviewProps {
  call: CallLog;
}

export function CallOverview({ call }: CallOverviewProps) {
  return (
    <Card className="bg-surface border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-text-primary">Call Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-text-secondary">Call ID</p>
                <p className="text-text-primary font-medium">{call.id}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-text-secondary">Patient</p>
                <p className="text-text-primary font-medium">{call.Name || 'Unknown'}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-text-secondary">Duration</p>
                <p className="text-text-primary font-medium">{call.duration_seconds || 0} seconds</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-text-secondary">Date & Time</p>
                <p className="text-text-primary font-medium">
                  {new Date(call.start_time).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <ThumbsUp className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-text-secondary">Sentiment</p>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSentimentColor(call.Sentiment)}`}>
                  {call.Sentiment || 'N/A'}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-text-secondary">Urgency</p>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(call.Urgencylevel)}`}>
                  {call.Urgencylevel || 'N/A'}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <MessageCircle className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-text-secondary">Status</p>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(call.Status)}`}>
                  {call.Status || 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}