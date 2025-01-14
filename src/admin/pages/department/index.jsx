/* eslint-disable react/jsx-key */
import { Button, Dropdown, Table } from "antd";
import AdminPageLayout from "../../layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { MoreOutlined } from '@ant-design/icons';
import { routePath } from "../../../config";

const BASE_URL = import.meta.env.VITE_URL;

export default function DepartmentPage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation()

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/departments?entity=departments`);
            setData(response.data.results);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [location.pathname]);

    const columns = [
        {
            title: "Sl No",
            dataIndex: 'sl_no',
            key: "sl_no",
            align: "center",
            render: (_, __, index) => index + 1,
            width: 80
        },
        {
            title: 'Action',
            key: 'action',
            align: "center",
            width: 80,
            render: (_, record) => (
                <Dropdown
                    stye={{ width: "200px" }}
                    menu={{
                        items: [
                            {
                                key: '1',
                                label: 'View',
                                onClick: () => navigate(`${routePath.viewDepartment}/${record.entityId}`)
                            },
                            {
                                key: '2',
                                label: 'Edit',
                                onClick: () => navigate(`${routePath.editDepartment}/${record.entityId}`)
                            }
                        ]
                    }}
                    trigger={['click']}
                >
                    <MoreOutlined className="cursor-pointer text-lg" />
                </Dropdown>
            ),
        },
        {
            title: 'Department Name',
            dataIndex: 'department',
            key: 'department',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Course',
            dataIndex: 'course',
            key: 'course',
        },
        {
            title: 'Semester',
            dataIndex: 'semester',
            key: 'semester',
        },
    ];

    return (
        <AdminPageLayout
            title="Department"
            actions={[
                <Button
                    type="primary"
                    onClick={() => navigate(routePath.addDepartment)}
                >
                    Add Department
                </Button>
            ]}
        >
            <div className="h-full flex flex-col">
                <Table
                    dataSource={data}
                    columns={columns}
                    loading={loading}
                    rowKey="entityId"
                    scroll={{ y: 'calc(100vh - 250px)' }}
                />
                <Outlet />
            </div>
        </AdminPageLayout>
    );
}