
export interface ResearchLog {
  id: string;
  call_id: string;
  patient_name: string;
  date_of_birth: string;
  conversation_summary: string;
  research_name: string;
  research_date: string;
  transcript: string;
  duration_seconds: string;
  created_at: string;
  findings: string;
  recommendation: string;
  confidence_level: string;
  relevance_score: number;
  phone_number: string;
  patient_id: string;
  sources: any;
}

// Helper function to check if a research log has meaningful data
export function isEmptyResearchLog(log: ResearchLog): boolean {
  return !(
    log.patient_name || 
    log.research_name || 
    log.findings || 
    log.recommendation || 
    (log.transcript && log.transcript.length > 10)
  );
}

// Helper function to check if a date is valid
export function isValidDate(dateString: string | null): boolean {
  if (!dateString) return false;
  
  const date = new Date(dateString);
  
  // Check if date is valid (not Invalid Date)
  if (isNaN(date.getTime())) return false;
  
  // Check if date is not the Unix epoch (1/1/1970)
  if (date.getFullYear() === 1970 && date.getMonth() === 0 && date.getDate() === 1) return false;
  
  // Check if date is not in the future (allow some margin for timezone differences)
  const now = new Date();
  const oneWeekInFuture = new Date();
  oneWeekInFuture.setDate(now.getDate() + 7);
  
  if (date > oneWeekInFuture) return false;
  
  return true;
}
