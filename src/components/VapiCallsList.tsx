import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const VapiCallsList = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-surface">
      <div className="container mx-auto px-4">
        <Card className="bg-surface-secondary border-surface-input">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-text-primary">
              {t("calls.recentCalls")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-surface border-surface-input">
                  <TableHead className="text-text-primary">{t("calls.date")}</TableHead>
                  <TableHead className="text-text-primary">{t("calls.caller")}</TableHead>
                  <TableHead className="text-text-primary">{t("calls.duration")}</TableHead>
                  <TableHead className="text-text-primary">{t("calls.status")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default VapiCallsList;