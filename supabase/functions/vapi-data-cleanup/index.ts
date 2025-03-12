
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('Starting VAPI data cleanup check...')
    
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get scan mode from URL parameters
    const url = new URL(req.url);
    const mode = url.searchParams.get('mode') || 'scan';
    const dryRun = mode !== 'fix';
    
    console.log(`Running in ${dryRun ? 'scan' : 'fix'} mode`);

    // Tables to scan
    const tables = [
      'call_logs_triage',
      'call_logs_medications',
      'call_logs_researchresults',
      'demo_call_logs_triage',
      'demo_call_logs_medications',
      'demo_call_logs_researchresults'
    ];

    const results = {};
    const issues = [];
    
    // Process each table
    for (const table of tables) {
      console.log(`Scanning table: ${table}`);
      
      // Fetch all records from the table
      const { data, error } = await supabaseClient
        .from(table)
        .select('*');
        
      if (error) {
        console.error(`Error fetching data from ${table}:`, error);
        issues.push({ table, error: error.message });
        results[table] = { error: error.message };
        continue;
      }
      
      if (!data || data.length === 0) {
        console.log(`No records found in ${table}`);
        results[table] = { count: 0, issues: 0 };
        continue;
      }
      
      console.log(`Found ${data.length} records in ${table}`);
      
      const issueRecords = [];
      
      // Check each record for date issues
      for (const record of data) {
        const dateFields = ['start_time', 'end_time', 'created_at'];
        let hasDateIssue = false;
        
        for (const field of dateFields) {
          if (record[field]) {
            const date = new Date(record[field]);
            
            // Check for invalid date or 1970 (Unix epoch)
            if (isNaN(date.getTime()) || 
                (date.getFullYear() === 1970 && date.getMonth() === 0 && date.getDate() === 1)) {
              hasDateIssue = true;
              break;
            }
          }
        }
        
        // If record has issues, add it to the list
        if (hasDateIssue) {
          issueRecords.push({
            id: record.id,
            call_id: record.call_id,
            start_time: record.start_time,
            end_time: record.end_time,
            created_at: record.created_at
          });
          
          // If we're in fix mode, delete the problematic record
          if (!dryRun) {
            const { error: deleteError } = await supabaseClient
              .from(table)
              .delete()
              .eq('id', record.id);
              
            if (deleteError) {
              console.error(`Error deleting problematic record ${record.id}:`, deleteError);
              issues.push({ table, record: record.id, error: deleteError.message });
            } else {
              console.log(`Successfully deleted problematic record ${record.id}`);
            }
          }
        }
      }
      
      results[table] = {
        count: data.length,
        issues: issueRecords.length,
        problematicRecords: issueRecords
      };
      
      console.log(`Found ${issueRecords.length} problematic records in ${table}`);
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        mode: dryRun ? 'scan' : 'fix',
        message: dryRun ? 'Scan completed - run with ?mode=fix to clean up problematic records' : 'Cleanup completed',
        results,
        issues: issues.length > 0 ? issues : undefined
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    console.error('Error in data cleanup process:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.toString()
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})
