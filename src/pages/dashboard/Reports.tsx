
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, Printer, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const Reports = () => {
  const { t } = useLanguage();
  
  const reports = [
    {
      title: t("reports.monthlyPerformance"),
      description: t("reports.monthlyDesc"),
      date: "March 2024",
      type: "Performance",
    },
    {
      title: t("reports.satisfaction"),
      description: t("reports.satisfactionDesc"),
      date: "Q1 2024",
      type: "Satisfaction",
    },
    {
      title: t("reports.volumeAnalysis"),
      description: t("reports.volumeDesc"),
      date: "Last 30 days",
      type: "Analytics",
    },
    {
      title: t("reports.efficiency"),
      description: t("reports.efficiencyDesc"),
      date: "February 2024",
      type: "Efficiency",
    },
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-forest">{t("reports.title")}</h2>
        <p className="text-gray-500">{t("reports.subtitle")}</p>
      </div>

      <div className="grid gap-6">
        {reports.map((report) => (
          <Card key={report.title} className="bg-white">
            <CardHeader className="flex flex-row items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="text-xl text-forest">{report.title}</CardTitle>
                <p className="text-sm text-gray-500">{report.description}</p>
              </div>
              <span className="px-3 py-1 text-xs bg-mint/10 text-mint rounded-full">
                {report.type}
              </span>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <FileText className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-500">{report.date}</span>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Printer className="w-4 h-4 mr-2" />
                    {t("reports.print")}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    {t("reports.share")}
                  </Button>
                  <Button size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    {t("reports.download")}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle>{t("reports.customReport")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 mb-4">
            {t("reports.customDesc")}
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-forest">{t("reports.dateRange")}</label>
              <select className="w-full p-2 border rounded-md">
                <option>{t("reports.lastWeek")}</option>
                <option>{t("reports.lastMonth")}</option>
                <option>{t("reports.last3Months")}</option>
                <option>{t("reports.customRange")}</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-forest">{t("reports.reportType")}</label>
              <select className="w-full p-2 border rounded-md">
                <option>{t("reports.performanceMetrics")}</option>
                <option>{t("reports.callAnalytics")}</option>
                <option>{t("reports.patientSatisfaction")}</option>
                <option>{t("reports.resourceUtilization")}</option>
              </select>
            </div>
          </div>
          <Button className="mt-4">
            {t("reports.generate")}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
