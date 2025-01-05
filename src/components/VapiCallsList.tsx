import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const VapiCallsList = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-forest">
              {t("calls.recentCalls")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("calls.date")}</TableHead>
                  <TableHead>{t("calls.caller")}</TableHead>
                  <TableHead>{t("calls.duration")}</TableHead>
                  <TableHead>{t("calls.status")}</TableHead>
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