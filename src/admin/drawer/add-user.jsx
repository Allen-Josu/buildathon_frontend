import { Button, Drawer, Form, Input, Select, Space } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { useNavigate } from 'react-router-dom';
import { CourseSelectOption, SemesterSelectOption } from '../constants';
import { useState } from 'react';
import { v4 as uuid } from "uuid";
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_URL;

export default function AddUserDrawer() {
    const [data, setData] = useState({});
    const navigate = useNavigate();

    const onClose = () => {
        navigate(-1);
    };

    const onSubmit = async () => {
        try {

            const completeData = {
                ...data,
                entity: "users",
                userId: uuid(),
                entityId: uuid(),
                department: "DCA"
            };
            await axios.post(`${BASE_URL}/users`, completeData);
            onClose()
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Drawer
            width={600}
            title="Add Users"
            onClose={onClose}
            open
            extra={
                <Space>
                    <Button type="primary" onClick={onSubmit} style={{ background: "#6d28d9", border: "none" }}>
                        Submit
                    </Button>
                </Space>
            }
        >
            <Space direction="vertical" className="w-full">
                <Form layout="vertical">
                    <FormItem label="User Name">
                        <Input onChange={(e) => setData({ ...data, username: e.target.value })} />
                    </FormItem>
                    <FormItem label="Password">
                        <Input onChange={(e) => setData({ ...data, password: e.target.value })} />
                    </FormItem>
                    {/* <FormItem label="Role">
                        <Select
                            options={RoleSelectOption}
                            onChange={(value) => setData({ ...data, role: value })}
                        />
                    </FormItem> */}


                    <FormItem label="Student Id">
                        <Input onChange={(e) => setData({ ...data, studentId: e.target.value })} />
                    </FormItem>
                    <FormItem label="Department">
                        <Input value="DCA" disabled />
                    </FormItem>
                    <FormItem label="Course">
                        <Select
                            options={CourseSelectOption}
                            onChange={(value) => setData({ ...data, course: value })}
                        />
                    </FormItem>
                    <FormItem label="Semester">
                        <Select
                            options={SemesterSelectOption}
                            onChange={(value) => setData({ ...data, semester: value })}
                        />
                    </FormItem>



                </Form>
            </Space>
        </Drawer>
    );
}
