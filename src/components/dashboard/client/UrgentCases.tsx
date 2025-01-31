
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/lib/supabaseClient";
import { useQuery } from "@tanstack/react-query";
import { getUrgencyColor } from "@/utils/urgencyUtils";
import { Button } from "@/components/ui/button";
import { Filter, List } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface CallLog {
  id: string;
  call_id: string;
  Name: string;
  Symptoms: any;
  Urgencylevel: string;
  Forwarded: boolean;
  appointment_date: string;
  Action: string;
  conversation_summary: string;
  start_time: string;
  duration_seconds: string;
  Emotion: string;
}

const fetchUrgentCalls = async (isIrrelevant: boolean = false) => {
  const { data: assistantStatus } = await supabase
    .from('assistant_status')
    .select('assistant_id')
    .eq('profile_id', (await supabase.auth.getSession()).data.session?.user.id)
    .single();

  if (!assistantStatus?.assistant_id) {
    throw new Error('No assistant ID found');
  }

  const urgencyLevels = isIrrelevant ? ['U1', 'U5'] : ['U2', 'U3', 'U4'];

  const { data, error } = await supabase
    .from('call_logs')
    .select('*')
    .eq('assistant_id', assistantStatus.assistant_id)
    .in('Urgencylevel', urgencyLevels)
    .order('start_time', { ascending: false })
    .limit(5);

  if (error) throw error;
  return data as CallLog[];
};

interface UrgentCasesProps {
  isIrrelevant?: boolean;
}

export function UrgentCases({ isIrrelevant = false }: UrgentCasesProps) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { data: calls, isLoading, error } = useQuery({
    queryKey: ['urgentCalls', isIrrelevant],
    queryFn: () => fetchUrgentCalls(isIrrelevant),
  });

  if (isLoading) {
    return (
      <Card className="bg-white border border-gray-muted shadow-sm">
        <CardContent className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-dark"></div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-white border border-gray-muted shadow-sm">
        <CardContent className="p-4">
          <p className="text-center text-gray">{t("dashboard.urgentCases.errorLoading")}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white border border-gray-muted shadow-sm w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CardTitle className="text-gray-dark">
              {isIrrelevant 
                ? t("dashboard.urgentCases.irrelevantTitle")
                : t("dashboard.urgentCases.title")}
            </CardTitle>
            <div className="flex items-center gap-2">
              {isIrrelevant ? (
                <>
                  <span className={`px-2 py-1 rounded-full text-xs border ${getUrgencyColor('U1')}`}>U1</span>
                  <span className={`px-2 py-1 rounded-full text-xs border ${getUrgencyColor('U5')}`}>U5</span>
                  <span className="px-2 py-1 rounded-full text-xs border bg-gray-500/20 border-gray-500/30 text-gray-500">
                    <Filter className="w-3 h-3 inline-block mr-1" />
                    {t("dashboard.urgentCases.other")}
                  </span>
                </>
              ) : (
                ['U2', 'U3', 'U4'].map((level) => (
                  <span
                    key={level}
                    className={`px-2 py-1 rounded-full text-xs border ${getUrgencyColor(level)}`}
                  >
                    {level}
                  </span>
                ))
              )}
            </div>
          </div>
          <Button
            variant="outline"
            className="text-blue-dark border-gray-muted hover:bg-gray-muted"
            onClick={() => navigate('/dashboard/calls')}
          >
            {t("dashboard.urgentCases.viewAll")}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-muted">
              <TableHead className="text-left p-4 text-gray w-[15%]">{t("dashboard.urgentCases.columns.patient")}</TableHead>
              <TableHead className="text-left p-4 text-gray w-[20%]">{t("dashboard.urgentCases.columns.symptoms")}</TableHead>
              <TableHead className="text-left p-4 text-gray w-[10%]">{t("dashboard.urgentCases.columns.urgency")}</TableHead>
              <TableHead className="text-left p-4 text-gray w-[12%]">{t("dashboard.urgentCases.columns.forwarded")}</TableHead>
              <TableHead className="text-left p-4 text-gray w-[20%]">{t("dashboard.urgentCases.columns.summary")}</TableHead>
              <TableHead className="text-left p-4 text-gray w-[8%]">{t("dashboard.urgentCases.columns.duration")}</TableHead>
              <TableHead className="text-left p-4 text-gray w-[15%]">{t("dashboard.urgentCases.columns.emotion")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {calls?.map((call) => (
              <TableRow 
                key={call.id} 
                className="border-b border-gray-muted hover:bg-gray-muted/10 cursor-pointer transition-colors"
                onClick={() => navigate(`/dashboard/calls/${call.call_id}`)}
              >
                <TableCell className="p-4 text-gray-dark w-[15%]">{call.Name || t("dashboard.urgentCases.unknown")}</TableCell>
                <TableCell className="p-4 text-gray w-[20%]">
                  <div className="truncate max-w-[250px]" title={call.Symptoms}>
                    {call.Symptoms}
                  </div>
                </TableCell>
                <TableCell className="p-4 w-[10%]">
                  <span className={`px-2 py-1 rounded-full text-xs border ${getUrgencyColor(call.Urgencylevel)}`}>
                    {call.Urgencylevel}
                  </span>
                </TableCell>
                <TableCell className="p-4 w-[12%]">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    call.Forwarded
                      ? 'bg-green-light text-green'
                      : 'bg-gray-500/10 text-gray-400'
                  }`}>
                    {call.Forwarded ? t("dashboard.urgentCases.yes") : t("dashboard.urgentCases.no")}
                  </span>
                </TableCell>
                <TableCell className="p-4 text-gray w-[20%]">
                  <div className="truncate max-w-[250px]" title={call.conversation_summary}>
                    {call.conversation_summary}
                  </div>
                </TableCell>
                <TableCell className="p-4 text-gray w-[8%]">
                  {call.duration_seconds ? `${Math.round(parseFloat(call.duration_seconds))}s` : t("dashboard.urgentCases.na")}
                </TableCell>
                <TableCell className="p-4 w-[15%]">
                  <span className={`px-2 py-1 rounded-full text-xs border ${
                    call.Emotion?.toLowerCase() === 'happy'
                      ? 'bg-green-500/20 border-green-500/30 text-green-500'
                      : call.Emotion?.toLowerCase() === 'sad'
                      ? 'bg-blue-500/20 border-blue-500/30 text-blue-500'
                      : call.Emotion?.toLowerCase() === 'angry'
                      ? 'bg-red-500/20 border-red-500/30 text-red-500'
                      : call.Emotion?.toLowerCase() === 'neutral'
                      ? 'bg-gray-500/20 border-gray-500/30 text-gray-500'
                      : 'bg-slate-500/20 border-slate-500/30 text-slate-500'
                  }`}>
                    {call.Emotion || t("dashboard.urgentCases.na")}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
