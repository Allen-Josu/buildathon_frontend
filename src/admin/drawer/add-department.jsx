import { Button, Drawer, Form, Input, Select, Space } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useNavigate } from "react-router-dom";
import { SemesterSelectOption } from "../constants";
import { useEffect, useState } from "react";
import Title from "antd/es/typography/Title";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { v4 as uuid } from "uuid";


const BASE_URL = import.meta.env.VITE_URL;

export default function AddDepartment() {
    const navigate = useNavigate()
    const [data, setData] = useState(null)
    const [subjects, setSubjects] = useState([]);
    const [responseData, setResponseData] = useState(null)

    const fetchData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/departments?entity=departments`)
            setResponseData(response.data.results)
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])


    const onClose = () => {
        navigate(-1);
    };

    const handleFieldChange = (index, field, value) => {
        const newSubjects = [...subjects];
        if (!newSubjects[index]) {
            newSubjects[index] = { subjectName: '', subjectCode: '' };
        }
        newSubjects[index][field] = value;
        setSubjects(newSubjects);
    };

    const handleRemove = (index) => {
        const newSubjects = subjects.filter((_, idx) => idx !== index);
        setSubjects(newSubjects);
    };

    const isDuplicate = (responseData) => {
        return responseData.some(item =>
            item.semester === data.semester &&
            item.department === data.department &&
            item.course === data.course
        );
    };

    const handleSubmit = async () => {
        setData({ ...data, subjects, entityId: uuid(), entity: "departments" })
        if (isDuplicate(responseData)) {
            console.log("Error: Duplicate entry found");
            return;
        }
        const response = await axios.post(`${BASE_URL}/departments`, data)
        response.status == 200 && onClose()
    };
    console.log(data);


    return (
        <>
            <Drawer
                width={600}
                title="Add Department"
                onClose={onClose}
                open
                extra={
                    <Space >
                        <Button type="primary" onClick={handleSubmit} style={{ background: "#6d28d9", border: "none" }}>
                            Submit
                        </Button>
                    </Space>
                }
            >
                <Space direction="vertical" className="w-full" >
                    <Form layout="vertical" className="w-full">
                        <FormItem label="Department">
                            <Input onChange={(e) => { setData({ ...data, department: e.target.value }) }} />
                        </FormItem>

                        <FormItem label="Course">
                            <Input onChange={(e) => { setData({ ...data, course: e.target.value }) }} />
                        </FormItem>

                        <FormItem label="Semester">
                            <Select options={SemesterSelectOption} onChange={(value) => { setData({ ...data, semester: value }) }} />
                        </FormItem>

                        <Title level={5}>Subjects</Title>
                        <Form.List
                            name="subjects"
                        >
                            {(fields, { add, remove }, { errors }) => (
                                <>
                                    {fields.map((field, index) => (
                                        <Form.Item
                                            required={false}
                                            key={field.key}
                                            style={{ width: "100%" }}
                                        >
                                            <Form.Item
                                                {...field}
                                                validateTrigger={['onChange', 'onBlur']}
                                            >
                                                <Space direction='horizontal' >
                                                    <Input
                                                        placeholder="Subject Name"
                                                        onChange={(e) => handleFieldChange(index, 'subjectName', e.target.value)}
                                                        value={subjects[index]?.subjectName || ''}
                                                    />
                                                    <Input
                                                        placeholder="Subject Code"
                                                        onChange={(e) => handleFieldChange(index, 'subjectCode', e.target.value)}
                                                        value={subjects[index]?.subjectCode || ''}
                                                    />
                                                    {fields.length > 1 && (
                                                        <MinusCircleOutlined
                                                            onClick={() => {
                                                                remove(field.name);
                                                                handleRemove(index);
                                                            }}
                                                        />
                                                    )}
                                                </Space>
                                            </Form.Item>
                                        </Form.Item>
                                    ))}
                                    <Form.Item>
                                        <Button
                                            type="dashed"
                                            onClick={() => add()}
                                            style={{
                                                width: '100%',
                                            }}
                                            icon={<PlusOutlined />}
                                        >
                                            Add Subject
                                        </Button>
                                        <Form.ErrorList errors={errors} />
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                    </Form>
                </Space>
            </Drawer >
        </>
    )
}
