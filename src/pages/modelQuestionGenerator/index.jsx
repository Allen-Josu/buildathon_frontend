import React, { useState } from "react";
import { AlertCircle, BookOpen, FileText } from "lucide-react";
import Button from "../../components/ui/button";
import Card from "antd/es/card/Card";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import Header from "../../components/Header/Header";

const QuestionPaperGenerator = () => {
  const [files, setFiles] = useState({
    syllabus: null,
    pyq: null,
  });

  const [fileNames, setFileNames] = useState({
    syllabus: "",
    pyq: "",
  });
  const [isGenerated, setIsGenerated] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [extractedText, setExtractedText] = useState({
    syllabus: "",
    pyq: "",
  });
  const [questionPaper, setQuestionPaper] = useState(null);

  const handleFileChange = (event, fileKey) => {
    const file = event.target.files[0];

    if (file) {
      if (
        file.type === "application/pdf" ||
        file.name.toLowerCase().endsWith(".pdf")
      ) {
        setFiles((prev) => ({
          ...prev,
          [fileKey]: file,
        }));
        setFileNames((prev) => ({
          ...prev,
          [fileKey]: file.name,
        }));
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
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach((input) => (input.value = ""));
  };

  return (
    <>
      <Header />
      <div className="min-h-screen  bg-[#27272a] flex items-center justify-center p-4">
        <div className="w-full max-w-4xl space-y-4">
          {!isGenerated && (
            <div className="w-full flex justify-center ">
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
                            className="block w-full text-sm text-gray-500
                               file:mr-4 file:py-2 file:px-4
                               file:rounded-md file:border-0
                               file:text-sm file:font-semibold
                               file:bg-blue-50 file:text-blue-700
                               hover:file:bg-blue-100"
                          />
                          {fileNames.syllabus && (
                            <span className="text-sm text-green-600">
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
                            className="block w-full text-sm text-gray-500
                               file:mr-4 file:py-2 file:px-4
                               file:rounded-md file:border-0
                               file:text-sm file:font-semibold
                               file:bg-blue-50 file:text-blue-700
                               hover:file:bg-blue-100"
                          />
                          {fileNames.pyq && (
                            <span className="text-sm text-green-600">
                              Selected: {fileNames.pyq}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {message && (
                      <div
                        className={`flex items-center gap-2 ${
                          message.includes("Error") ||
                          message.includes("failed")
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
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
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {loading ? "Processing..." : "Generate Question Paper"}
                  </Button>
                  <Button
                    type="button"
                    onClick={handleReset}
                    disabled={loading}
                    variant="outline"
                    className="w-full"
                  >
                    Reset
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}

          {questionPaper && isGenerated && (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold">
                  Generated Question Paper
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold">
                      {questionPaper.title}
                    </h2>
                    <p className="text-gray-600">
                      Duration: {questionPaper.duration}
                    </p>
                    <p className="text-gray-600">
                      Maximum Marks: {questionPaper.max_marks}
                    </p>
                  </div>

                  {questionPaper.sections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="space-y-4">
                      <h3 className="text-lg font-semibold">{section.name}</h3>
                      <p className="text-sm text-gray-600">
                        ({section.marks_per_question} marks each)
                      </p>
                      <ol className="list-decimal list-inside space-y-2">
                        {section.questions.map((question, questionIndex) => (
                          <li key={questionIndex} className="text-gray-800">
                            {question}
                          </li>
                        ))}
                      </ol>
                    </div>
                  ))}
                </div>
              </CardContent>
              
            </Card>
          )}

          {(extractedText.syllabus || extractedText.pyq) && isGenerated && (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold">
                  Extracted Text
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="syllabus" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
                    <TabsTrigger value="pyq">Previous Questions</TabsTrigger>
                  </TabsList>
                  <TabsContent value="syllabus">
                    <Card>
                      <CardContent className="mt-4">
                        <pre className="whitespace-pre-wrap font-mono text-sm bg-gray-50 p-4 rounded-lg max-h-96 overflow-auto">
                          {extractedText.syllabus || "No text extracted"}
                        </pre>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="pyq">
                    <Card>
                      <CardContent className="mt-4">
                        <pre className="whitespace-pre-wrap font-mono text-sm bg-gray-50 p-4 rounded-lg max-h-96 overflow-auto">
                          {extractedText.pyq || "No text extracted"}
                        </pre>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between gap-4">
                <Button
                  type="button"
                  onClick={() => {
                    setIsGenerated(false);
                  }}
                  className="w-full bg-black-50 hover:bg-[#6d28d9]-500"
                >
                  Back
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

export default QuestionPaperGenerator;