import { Button, Drawer, Form, Input, Select, Space } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useNavigate, useParams } from "react-router-dom";
import { SemesterSelectOption } from "../constants";
import { useEffect, useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import Title from "antd/es/typography/Title";

const BASE_URL = import.meta.env.VITE_URL;

export default function EditDepartment() {
    const navigate = useNavigate()
    const [data, setData] = useState(null)
    const [subjects, setSubjects] = useState([]);
    const [form] = Form.useForm();
    const { entityId } = useParams()

    const fetchData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/departments?entity=departments&entityId=${entityId}`)
            setData(response.data.results)
            setSubjects(response.data.results.subjects || [])
            form.setFieldsValue({
                subjects: response.data.results.subjects || []
            });
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



    const handleSubmit = async () => {
        const updatingData = {
            entity: "departments",
            entityId,
            attributesToUpdate: {
                subjects: subjects
            }
        }
        try {
            const response = await axios.patch(`${BASE_URL}/update-entity`, updatingData)
            response.status == 200 && onClose()
        }
        catch (error) {
            console.log(error);
        }
    };



    return (
        <>
            <Drawer
                width={600}
                title="Edit Department"
                onClose={onClose}
                open
                extra={
                    <Space>
                        <Button onClick={handleSubmit} type="primary" style={{ background: "#6d28d9", border: "none" }}>
                            Submit
                        </Button>
                    </Space>
                }
            >
                <Space direction="vertical" className="w-full">
                    <Form
                        layout="vertical"
                        className="w-full"
                        form={form}
                        initialValues={{
                            subjects: subjects
                        }}
                    >
                        <FormItem label="Department">
                            <Input
                                value={data?.department}
                                disabled
                            // onChange={(e) => { setData({ ...data, department: e.target.value }) }}
                            />
                        </FormItem>

                        <FormItem label="Course">
                            <Input
                                value={data?.course}
                                disabled
                            // onChange={(e) => { setData({ ...data, course: e.target.value }) }}
                            />
                        </FormItem>

                        <FormItem label="Semester">
                            <Select
                                value={data?.semester}
                                disabled
                                options={SemesterSelectOption}
                            // onChange={(value) => { setData({ ...data, semester: value }) }}
                            />
                        </FormItem>

                        <Title level={5}>Subjects</Title>

                        <Form.List
                            name="subjects"
                            initialValue={subjects}
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
                                                <Space direction='horizontal'>
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
                                                    <MinusCircleOutlined
                                                        onClick={() => {
                                                            remove(field.name);
                                                            handleRemove(index);
                                                        }}
                                                    />
                                                </Space>
                                            </Form.Item>
                                        </Form.Item>
                                    ))}
                                    <Form.Item>
                                        <Button
                                            type="dashed"
                                            onClick={() => {
                                                add();
                                                setSubjects([...subjects, { subjectName: '', subjectCode: '' }]);
                                            }}
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
            </Drawer>
        </>
    )
}