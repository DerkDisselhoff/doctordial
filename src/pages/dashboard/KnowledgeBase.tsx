
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, FileText, Clock, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Types for knowledge base items
interface KnowledgeBaseItem {
  id: string;
  title: string;
  description: string;
  type: "document" | "video" | "guide";
  dateAdded: string;
  readTime?: string;
}

const KnowledgeBase = () => {
  // Sample data for knowledge base items
  const knowledgeItems: KnowledgeBaseItem[] = [
    {
      id: "test-script-triage",
      title: "Test Script Triage",
      description: "Een handleiding voor het testen van de AI-triage-assistent in verschillende scenario's.",
      type: "document",
      dateAdded: "2023-06-15",
      readTime: "5 min"
    },
    {
      id: "test-script-medicatie",
      title: "Test Script Medicatie (herhaalrecepten)",
      description: "Een handleiding voor het testen van de AI-medicatie-assistent voor herhaalrecepten.",
      type: "document",
      dateAdded: "2023-09-10",
      readTime: "4 min"
    },
    {
      id: "test-script-onderzoek",
      title: "Test Script Onderzoek uitslagen (terugbelverzoek)",
      description: "Een handleiding voor het testen van de AI-assistent voor het communiceren van onderzoeksuitslagen.",
      type: "document",
      dateAdded: "2023-10-05",
      readTime: "6 min"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-forest">Kennisbank</h2>
          <p className="text-gray-500">Ontdek hulpmiddelen en informatie om het meeste uit uw digitale assistenten te halen</p>
        </div>
      </div>

      {/* All Resources */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-forest">
            <BookOpen className="h-5 w-5 text-mint" />
            Alle Hulpmiddelen
          </CardTitle>
          <CardDescription>
            Bekijk alle beschikbare hulpmiddelen in onze kennisbank
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {knowledgeItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-50 rounded-lg p-5 border border-gray-muted/30 hover:border-mint/30 hover:bg-gray-50/80 transition-all group cursor-pointer"
              >
                <Link to={`/knowledge-base/${item.id}`} target="_blank" rel="noopener noreferrer" className="block">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-mint/10 text-mint flex-shrink-0">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-gray-dark group-hover:text-mint transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray mt-1">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-4 mt-3 text-sm text-gray-muted">
                        {item.readTime && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {item.readTime} leestijd
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          Toegevoegd op {new Date(item.dateAdded).toLocaleDateString('nl-NL', {
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                    <Button variant="ghost" className="text-mint">
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KnowledgeBase;
