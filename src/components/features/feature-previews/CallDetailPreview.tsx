import { Phone, Clock, MessageCircle, User, ThumbsUp, AlertCircle } from "lucide-react";

export function CallDetailPreview() {
  const mockCall = {
    call_id: "CALL-0001",
    caller_number: "John Smith",
    duration: 180,
    sentiment: "positive",
    urgency: "medium",
    status: "completed",
    transcription: "Hello, I'd like to schedule a follow-up appointment with Dr. Johnson for next week.",
  };

  return (
    <div className="p-6 space-y-6">
      <h3 className="text-lg font-semibold text-gray-dark">Call Details</h3>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Phone className="h-5 w-5 text-blue-dark" />
            <div>
              <p className="text-sm text-gray-light">Call ID</p>
              <p className="text-gray-dark font-medium">{mockCall.call_id}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <User className="h-5 w-5 text-blue-dark" />
            <div>
              <p className="text-sm text-gray-light">Caller</p>
              <p className="text-gray-dark font-medium">{mockCall.caller_number}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Clock className="h-5 w-5 text-blue-dark" />
            <div>
              <p className="text-sm text-gray-light">Duration</p>
              <p className="text-gray-dark font-medium">{mockCall.duration} seconds</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <ThumbsUp className="h-5 w-5 text-blue-dark" />
            <div>
              <p className="text-sm text-gray-light">Sentiment</p>
              <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
                {mockCall.sentiment}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <AlertCircle className="h-5 w-5 text-blue-dark" />
            <div>
              <p className="text-sm text-gray-light">Urgency</p>
              <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700">
                {mockCall.urgency}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <MessageCircle className="h-5 w-5 text-blue-dark" />
            <div>
              <p className="text-sm text-gray-light">Status</p>
              <p className="text-gray-dark font-medium">{mockCall.status}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-light mb-2">Transcription</p>
        <p className="text-gray-dark">{mockCall.transcription}</p>
      </div>
    </div>
  );
}