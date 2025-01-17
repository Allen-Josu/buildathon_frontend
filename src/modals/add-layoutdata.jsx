/* eslint-disable react/prop-types */
import { Button, Form, Input, Modal, Select } from "antd";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { useEffect, useState } from "react";
import { SemesterSelectOption } from "../admin/constants";
import { v4 as uuid } from "uuid";

const BASE_URL = import.meta.env.VITE_URL;

export default function Modals({ isModalOpen, setIsModalOpen, title, onSuccess }) {
  const [responseData, setResponseData] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [data, setData] = useState({
    department: "",
    course: "",
    semester: "",
    subjectName: "",
    subjectCode: "", // Added subjectCode to the state
    description: "",
    url: ""
  });

  const resetDependentFields = () => {
    setCourses([]);
    setSubjects([]);
    setData(prev => ({
      ...prev,
      course: "",
      semester: "",
      subjectName: "",
      subjectCode: "" // Reset subjectCode as well
    }));
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/departments?entity=departments`);
      setResponseData(response.data.results);

      const uniqueDepartments = [...new Set(response.data.results.map(item => item.department))];
      const formattedDepartments = uniqueDepartments.map(dept => ({
        label: dept,
        value: dept
      }));

      setDepartments(formattedDepartments);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDepartmentChange = (value) => {
    resetDependentFields();
    setData(prev => ({ ...prev, department: value }));

    const departmentCourses = responseData
      .filter(item => item.department === value)
      .map(item => ({
        label: item.course,
        value: item.course
      }));

    const uniqueCourses = Array.from(
      new Set(departmentCourses.map(JSON.stringify))
    ).map(JSON.parse);

    setCourses(uniqueCourses);
  };

  const handleCourseChange = (value) => {
    setData(prev => ({
      ...prev,
      course: value,
      semester: "",
      subjectName: "",
      subjectCode: ""
    }));
    setSubjects([]);
  };

  const handleSemesterChange = (value) => {
    setData(prev => ({
      ...prev,
      semester: value,
      subjectName: "",
      subjectCode: ""
    }));

    if (data.course && value) {
      const filteredSubjects = responseData
        .filter(item =>
          item.department === data.department &&
          item.course === data.course &&
          item.semester === value
        )[0]?.subjects
        .map(item => ({
          label: item.subjectName,
          value: item.subjectName,
          code: item.subjectCode // Store the subject code in the option
        }));

      setSubjects(filteredSubjects);
    }
  };

  const handleSubjectChange = (value) => {
    // Find the selected subject's details
    const selectedSubject = subjects.find(subject => subject.value === value);
    setData(prev => ({
      ...prev,
      subjectName: value,
      subjectCode: selectedSubject?.code || "" // Set the subject code when subject is selected
    }));
  };

  const handleSubmit = async () => {
    const submissionData = {
      ...data,
      entity: title,
      entityId: uuid(),
      likes: 0,
      uploadedBy: "Test123",
      userId: "test1234"
    };

    try {
      const response = await axios.post(`${BASE_URL}/newEntity`, submissionData);
      if (response.status === 200) {
        setIsModalOpen(false);
        resetDependentFields();
        onSuccess?.();
      }
    } catch (error) {
      console.error("Error submitting document:", error);
    }
  };

  return (
    <>
      <Modal
        centered
        open={isModalOpen}
        title="Upload Documents"
        onCancel={() => {
          setIsModalOpen(false);
          resetDependentFields();
        }}
        footer={null}
      >
        <Form layout="vertical" className="mt-6">
          <div className="w-full flex gap-3">
            <FormItem label="Department" style={{ width: "100%" }}>
              <Select
                options={departments}
                onChange={handleDepartmentChange}
                value={data.department}
              />
            </FormItem>

            <FormItem label="Course" style={{ width: "100%" }}>
              <Select
                options={courses}
                onChange={handleCourseChange}
                value={data.course}
                disabled={!data.department}
              />
            </FormItem>
          </div>

          <div className="w-full flex gap-3">
            <FormItem label="Semester" style={{ width: "100%" }}>
              <Select
                options={SemesterSelectOption}
                onChange={handleSemesterChange}
                value={data.semester}
                disabled={!data.course}
              />
            </FormItem>

            <FormItem label="Subject" style={{ width: "100%" }}>
              <Select
                options={subjects}
                onChange={handleSubjectChange}
                value={data.subjectName}
                disabled={!data.semester}
              />
            </FormItem>
          </div>

          <FormItem label="Description" style={{ width: "100%" }}>
            <Input
              onChange={(e) => setData(prev => ({ ...prev, description: e.target.value }))}
              value={data.description}
            />
          </FormItem>

          <FormItem label="Google Drive URL">
            <TextArea
              rows={2}
              style={{ resize: "none" }}
              onChange={(e) => setData(prev => ({ ...prev, url: e.target.value }))}
              value={data.url}
            />
          </FormItem>

          <div>
            <Button
              type="primary"
              style={{ background: "#6d28d9", width: "100%" }}
              onClick={handleSubmit}
              disabled={!data.department || !data.course || !data.semester || !data.subjectName}
            >
              Submit
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}