import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Clock, MessageCircle, User, ThumbsUp, AlertCircle, Calendar, ArrowRight, Tag, Building2, FileCheck } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useQuery } from "@tanstack/react-query";

interface CallLog {
  id: string;
  call_id: string;
  start_time: string;
  Sentiment: string;
  Urgencylevel: string;
  Name: string;
  duration_seconds: string;
  conversation_summary: string;
  Status: string;
  follow_up_notes: string | null;
}

const fetchCallDetails = async (callId: string) => {
  const { data, error } = await supabase
    .from('call_logs')
    .select('*')
    .eq('call_id', callId)
    .maybeSingle();

  if (error) throw error;
  if (!data) throw new Error('Call not found');
  return data as CallLog;
};

export function CallDetail() {
  const { callId } = useParams();
  
  const { data: call, isLoading, error } = useQuery({
    queryKey: ['callDetail', callId],
    queryFn: () => fetchCallDetails(callId || ''),
    enabled: !!callId,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mint"></div>
      </div>
    );
  }

  if (error || !call) {
    return (
      <Card>
        <CardContent className="p-4">
          <p className="text-center text-white/70">Call not found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="bg-forest-light/50 border-mint/10">
        <CardHeader className="pb-2">
          <CardTitle className="text-white">Call Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-mint" />
                <div>
                  <p className="text-sm text-white/60">Call ID</p>
                  <p className="text-white font-medium">{call.id}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-mint" />
                <div>
                  <p className="text-sm text-white/60">Patient</p>
                  <p className="text-white font-medium">{call.Name || 'Unknown'}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-mint" />
                <div>
                  <p className="text-sm text-white/60">Duration</p>
                  <p className="text-white font-medium">{call.duration_seconds || 0} seconds</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-mint" />
                <div>
                  <p className="text-sm text-white/60">Date & Time</p>
                  <p className="text-white font-medium">
                    {new Date(call.start_time).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <ThumbsUp className="h-5 w-5 text-mint" />
                <div>
                  <p className="text-sm text-white/60">Sentiment</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium
                    ${call.Sentiment === 'positive'
                      ? 'bg-green-100 text-green-700 border border-green-200'
                      : call.Sentiment === 'negative'
                      ? 'bg-red-100 text-red-700 border border-red-200'
                      : 'bg-gray-100 text-gray-700 border border-gray-200'
                    }`}>
                    {call.Sentiment || 'N/A'}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <AlertCircle className="h-5 w-5 text-mint" />
                <div>
                  <p className="text-sm text-white/60">Urgency</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium
                    ${call.Urgencylevel === 'high'
                      ? 'bg-red-100 text-red-700 border border-red-200'
                      : call.Urgencylevel === 'medium'
                      ? 'bg-orange-100 text-orange-700 border border-orange-200'
                      : 'bg-green-100 text-green-700 border border-green-200'
                    }`}>
                    {call.Urgencylevel || 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MessageCircle className="h-5 w-5 text-mint" />
                <div>
                  <p className="text-sm text-white/60">Status</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium
                    ${call.Status === 'completed'
                      ? 'bg-green-100 text-green-700 border border-green-200'
                      : call.Status === 'scheduled'
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : call.Status === 'missed'
                      ? 'bg-red-100 text-red-700 border border-red-200'
                      : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                    }`}>
                    {call.Status || 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-forest-light/50 border-mint/10">
        <CardHeader className="pb-2">
          <CardTitle className="text-white">Call Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white/70 mb-4">{call.conversation_summary || 'No summary available'}</p>
          
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Follow-up Details</h3>
            <div className="p-3 bg-forest rounded-lg border border-mint/10">
              <div className="flex items-start space-x-3">
                <ArrowRight className="h-5 w-5 text-mint mt-0.5" />
                <div>
                  <p className="text-white font-medium mb-1">Required Action</p>
                  <p className="text-white/70">{call.follow_up_notes || 'No follow-up required'}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
