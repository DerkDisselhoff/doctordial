import { DetailedCallsList } from "@/components/calls/DetailedCallsList";
import { Routes, Route } from "react-router-dom";
import { CallDetail } from "@/components/calls/CallDetail";

const Calls = () => {
  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-dark">Worker Output</h2>
        <p className="text-gray">Monitor and analyze worker performance</p>
      </div>

      <Routes>
        <Route index element={<DetailedCallsList />} />
        <Route path=":callId" element={<CallDetail />} />
      </Routes>
    </div>
  );
};

export default Calls;