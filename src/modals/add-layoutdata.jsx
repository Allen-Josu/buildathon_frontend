/* eslint-disable react/prop-types */
import { Form, Modal, Select } from "antd";
import FormItem from "antd/es/form/FormItem";
import axios from "axios";
import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_URL;

export default function Modals({ isModalOpen, setIsModalOpen }) {
  const [responseData, setResponseData] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [data, setData] = useState({})

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/departments?entity=departments`);
      setResponseData(response.data.results);

      // Transform the response data to create unique departments array
      const uniqueDepartments = [...new Set(response.data.results.map(item => item.department))];

      // Create the formatted departments array
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

  const CourseSelection = () => {

  }

  return (
    <>
      <Modal
        open={isModalOpen}
        title="Upload Documents"
        onCancel={() => setIsModalOpen(false)}
      >
        <Form layout="vertical" className="mt-6">
          <FormItem label="Department">
            <Select options={departments} onChange={(value) => { setData({ ...data, department: value }) }} />
          </FormItem>

          <FormItem label="Course">
            <Select options={CourseSelection} />
          </FormItem>
        </Form>

      </Modal>
    </>
  );
}