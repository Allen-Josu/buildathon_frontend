
import { useState } from "react";
import { AlertCircle, BookOpen, FileText } from "lucide-react";
import Button from "../../components/ui/button";
import Card from "antd/es/card/Card";
import { Download } from "lucide-react"; // Icon for the download button
import jsPDF from "jspdf";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import Header from "../../components/Header/Header";

export default function QuestionPaperGenerator() {
  const [files, setFiles] = useState({ syllabus: null, pyq: null });
  const [fileNames, setFileNames] = useState({ syllabus: "", pyq: "" });
  const [isGenerated, setIsGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [extractedText, setExtractedText] = useState({ syllabus: "", pyq: "" });
  const [questionPaper, setQuestionPaper] = useState(null);

  const handleFileChange = (event, fileKey) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")) {
        setFiles((prev) => ({ ...prev, [fileKey]: file }));
        setFileNames((prev) => ({ ...prev, [fileKey]: file.name }));
        setMessage("");
      } else {
        setMessage("Please select PDF files only");
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (files.syllabus && files.pyq) {
      setLoading(true);
      setMessage("");
      setExtractedText({ syllabus: "", pyq: "" });
      setQuestionPaper(null);

      try {
        const formData = new FormData();
        formData.append("syllabus_pdf", files.syllabus);
        formData.append("pyq_pdf", files.pyq);

        const response = await fetch("http://127.0.0.1:5000/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setMessage(data.message);

        if (response.ok) {
          setExtractedText(data.extracted_text);
          setQuestionPaper(data.question_paper);
          setIsGenerated(true);
        }
      } catch (error) {
        setMessage(`Upload failed: ${error.message}`);
        console.error("Upload error:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setMessage("Please select both PDF files before submitting");
    }
  };

  const handleReset = () => {
    setFiles({ syllabus: null, pyq: null });
    setFileNames({ syllabus: "", pyq: "" });
    setMessage("");
    setExtractedText({ syllabus: "", pyq: "" });
    setQuestionPaper(null);
    document.querySelectorAll('input[type="file"]').forEach((input) => (input.value = ""));
  };

  const downloadPDF = () => {
    if (questionPaper) {
      const doc = new jsPDF({ unit: "pt", format: "a4" });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 50; // Increased margin for better appearance
      const contentWidth = pageWidth - margin * 2;
      let yPosition = 70; // Start position for content
  
      // Title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text(questionPaper.title, pageWidth / 2, yPosition, {
        maxWidth: contentWidth,
        align: "center",
      });
      yPosition += 40;
  
      // Duration and Max Marks on the same line (left and right alignment)
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.text(`Duration: ${questionPaper.duration}`, margin, yPosition);
      doc.text(`Maximum Marks: ${questionPaper.max_marks}`, pageWidth - margin, yPosition, { align: "right" });
      yPosition += 40;
  
      // Sections and Questions
      questionPaper.sections.forEach((section) => {
        if (yPosition + 60 > pageHeight) {
          doc.addPage();
          yPosition = 70;
        }
  
        // Section Name and Marks Per Question on the same line
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text(section.name, margin, yPosition);
        doc.text(`(${section.marks_per_question} marks each)`, pageWidth - margin, yPosition, { align: "right" });
        yPosition += 20;
  
        // Questions
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        section.questions.forEach((question) => {
          const lines = doc.splitTextToSize(question, contentWidth);
  
          if (yPosition + lines.length * 15 > pageHeight) {
            doc.addPage();
            yPosition = 70;
          }
  
          doc.text(lines, margin, yPosition);
          yPosition += lines.length * 15 + 10; // Line height + spacing
        });
  
        yPosition += 20; // Space between sections
      });
  
      // Save PDF
      doc.save(`${questionPaper.title}.pdf`);
    }
  };
  
  


  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#27272a] flex items-center justify-center p-4">
        <div className="w-full max-w-4xl space-y-4">
          {!isGenerated && (
            <div className="w-full flex justify-center">
              <Card style={{ width: "600px" }}>
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-center">
                    Question Paper Generator
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          <div className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4" />
                            <span>Syllabus PDF</span>
                          </div>
                        </label>
                        <div className="flex flex-col gap-2">
                          <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) => handleFileChange(e, "syllabus")}
                            disabled={loading}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#020617] hover:file:bg-blue-100"
                          />
                          {fileNames.syllabus && (
                            <span className="text-sm text-[#020617]">
                              Selected: {fileNames.syllabus}
                            </span>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            <span>Previous Question Paper PDF</span>
                          </div>
                        </label>
                        <div className="flex flex-col gap-2">
                          <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) => handleFileChange(e, "pyq")}
                            disabled={loading}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#020617] hover:file:bg-blue-100"
                          />
                          {fileNames.pyq && (
                            <span className="text-sm text-[#020617]">
                              Selected: {fileNames.pyq}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {message && (
                      <div className={`flex items-center gap-2 ${message.includes("Error") || message.includes("failed") ? "text-green-600" : "text-red-600"}`}>
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm">{message}</span>
                      </div>
                    )}
                  </form>
                </CardContent>
                <CardFooter className="flex justify-between gap-4">
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-[#6d28d9] hover:bg-[#6d28d9]"
                    style={{ background: "#6d28d9" }}
                  >
                    {loading ? "Processing..." : "Generate Question Paper"}
                  </Button>
                  <Button
                    type="button"
                    onClick={handleReset}
                    disabled={loading}
                    variant="outline"
                    className="w-full bg-[#6d28d9]"
                    style={{ background: "#6d28d9" }}
                  >
                    Reset
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}

          {questionPaper && isGenerated && (
            <Card>
              <CardHeader className="flex justify-between items-center">
                <CardTitle className="text-xl font-bold">
                  Generated Question Paper
                </CardTitle>
                <div className="flex gap-4 ml-auto">
                  <Button
                    onClick={downloadPDF}
                    className="bg-[#6d28d9] hover:bg-[#5b21b6] text-white"
                    style={{ background: "#6d28d9" }}
                  >
                    Download PDF
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setIsGenerated(false)}
                    className="bg-[#6d28d9] hover:bg-[#6d28d9]"
                    style={{ background: "#6d28d9" }}
                  >
                    Back
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold">{questionPaper.title}</h2>
                    <p className="text-gray-600">Duration: {questionPaper.duration}</p>
                    <p className="text-gray-600">Maximum Marks: {questionPaper.max_marks}</p>
                  </div>

                  {questionPaper.sections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="space-y-4">
                      <h3 className="text-lg font-semibold">{section.name}</h3>
                      <p className="text-sm text-gray-600">({section.marks_per_question} marks each)</p>
                      <div className="space-y-2">
                        {section.questions.map((question, questionIndex) => (
                          <div key={questionIndex} className="text-gray-800">
                            {question}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}