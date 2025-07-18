/* eslint-disable react/jsx-key */
import { Button, Dropdown } from "antd";
import AdminPageLayout from "../../layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { MoreOutlined } from '@ant-design/icons';
import { routePath } from "../../../config";
import EduBuddyTable from "../../layout/table";

const BASE_URL = import.meta.env.VITE_URL;

export default function DepartmentPage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(0)

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
    }, [location.pathname, refresh]);

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
                            },
                            {
                                key: '3',
                                label: "Delete",
                                onClick: async () => {
                                    try {
                                        const response = await axios.delete(`${BASE_URL}/delete-entity?entity=departments&entityId=${record.entityId}`,)
                                        console.log(response);
                                        setRefresh(prev => prev + 1);
                                    }
                                    catch (error) {
                                        console.log(error);
                                    }
                                }
                            }
                        ],
                        style: { width: "100px", textAlign: "center" }
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
                    style={{ background: "#6d28d9", border: "none" }}
                    onClick={() => navigate(routePath.addDepartment)}
                >
                    Add Department
                </Button>
            ]}
        >
            <div className="h-90 flex flex-col">
                <EduBuddyTable
                    data={data}
                    columns={columns}
                    loading={loading}
                />
                <Outlet />
            </div>
        </AdminPageLayout>
    );
}