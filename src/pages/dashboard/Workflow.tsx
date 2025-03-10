
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Workflow() {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to the triage settings page as this functionality is now there
    navigate("/dashboard/assistants/triage-settings");
  }, [navigate]);

  return null; // This component will redirect, so no UI needed
}

export default Workflow;
