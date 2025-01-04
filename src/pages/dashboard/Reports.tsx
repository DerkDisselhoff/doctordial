import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, Printer, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Reports = () => {
  const reports = [
    {
      title: "Monthly Performance Report",
      description: "Comprehensive analysis of call handling and practice metrics",
      date: "March 2024",
      type: "Performance",
    },
    {
      title: "Patient Satisfaction Survey",
      description: "Analysis of patient feedback and satisfaction metrics",
      date: "Q1 2024",
      type: "Satisfaction",
    },
    {
      title: "Call Volume Analysis",
      description: "Detailed breakdown of call patterns and peak hours",
      date: "Last 30 days",
      type: "Analytics",
    },
    {
      title: "Practice Efficiency Report",
      description: "Metrics on response times and resource utilization",
      date: "February 2024",
      type: "Efficiency",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-forest">Reports</h2>
        <p className="text-gray-500">Access and generate detailed practice reports</p>
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
                    Print
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Custom Report Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 mb-4">
            Select parameters to generate a custom report based on your specific needs
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-forest">Date Range</label>
              <select className="w-full p-2 border rounded-md">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 3 months</option>
                <option>Custom range</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-forest">Report Type</label>
              <select className="w-full p-2 border rounded-md">
                <option>Performance Metrics</option>
                <option>Call Analytics</option>
                <option>Patient Satisfaction</option>
                <option>Resource Utilization</option>
              </select>
            </div>
          </div>
          <Button className="mt-4">
            Generate Report
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;