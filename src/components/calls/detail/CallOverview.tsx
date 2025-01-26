import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Clock, MessageCircle, User, ThumbsUp, AlertCircle, Calendar } from "lucide-react";
import { CallLog } from "../CallDetail";
import { getStatusColor, getSentimentColor, getUrgencyColor } from "../utils";

interface CallOverviewProps {
  call: CallLog;
}

export function CallOverview({ call }: CallOverviewProps) {
  return (
    <Card className="bg-white border border-gray-muted shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-gray-dark">Call Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-mint" />
              <div>
                <p className="text-sm text-gray">Call ID</p>
                <p className="text-gray-dark font-medium">{call.id}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-mint" />
              <div>
                <p className="text-sm text-gray">Patient</p>
                <p className="text-gray-dark font-medium">{call.Name || 'Unknown'}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-mint" />
              <div>
                <p className="text-sm text-gray">Duration</p>
                <p className="text-gray-dark font-medium">{call.duration_seconds || 0} seconds</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-mint" />
              <div>
                <p className="text-sm text-gray">Date & Time</p>
                <p className="text-gray-dark font-medium">
                  {new Date(call.start_time).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <ThumbsUp className="h-5 w-5 text-mint" />
              <div>
                <p className="text-sm text-gray">Sentiment</p>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSentimentColor(call.Sentiment)}`}>
                  {call.Sentiment || 'N/A'}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-mint" />
              <div>
                <p className="text-sm text-gray">Urgency</p>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(call.Urgencylevel)}`}>
                  {call.Urgencylevel || 'N/A'}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <MessageCircle className="h-5 w-5 text-mint" />
              <div>
                <p className="text-sm text-gray">Status</p>
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