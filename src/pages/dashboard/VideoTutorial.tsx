
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const VideoTutorial = () => {
  const navigate = useNavigate();

  return (
    <div className="container max-w-5xl mx-auto py-8 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-dark">Platform Instructies</h1>
          <p className="text-gray">Deze video geeft je een uitgebreide rondleiding door ons platform.</p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Terug
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative pb-[65.03918022905366%] h-0 overflow-hidden">
          <iframe
            src="https://www.loom.com/embed/0291890e632d4457b24026775ec554e8?sid=e77bc24b-060e-4bf0-aae9-927abc3bebf4"
            frameBorder="0"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          ></iframe>
        </div>
      </div>

      <div className="bg-mint-light p-6 rounded-lg border border-mint-light/50 mt-8">
        <h3 className="text-xl font-semibold text-gray-dark mb-2">Hulp nodig?</h3>
        <p className="text-gray mb-4">
          Heb je na het bekijken van deze video nog vragen over het gebruik van ons platform? 
          Neem dan contact op met onze klantenservice.
        </p>
        <Button 
          variant="default" 
          className="bg-mint hover:bg-mint-dark text-white"
          onClick={() => window.open('mailto:support@example.com', '_blank')}
        >
          Contact opnemen
        </Button>
      </div>
    </div>
  );
};

export default VideoTutorial;
