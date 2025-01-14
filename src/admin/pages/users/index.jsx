/* eslint-disable react/jsx-key */
import { Button, Table } from "antd";
import AdminPageLayout from "../../layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { routePath } from "../../../config";
import { MoreOutlined } from "@ant-design/icons";

const BASE_URL = import.meta.env.VITE_URL;

export default function UsersPage() {
    const [data, setData] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const fetchData = async () => {
        const response = await axios.get(`${BASE_URL}/users?entityType=all&entity=users`);
        setData(response.data.results);
    };

    const columns = [
        {
            title: "Sl No",
            dataIndex: 'sl_no',
            key: "sl_no",
            align: "center",
            render: (_, __, index) => index + 1,
            width: 100
        },
        {
            title: 'Action',
            key: 'action',
            render: () => (
                <MoreOutlined />
            ),
        },
        {
            title: 'Name',
            dataIndex: 'username',
            key: 'username',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Student ID',
            dataIndex: 'studentId',
            key: 'studentId',
            render: (text) => text || "NIL"
        },
        {
            title: 'Enitity ID',
            dataIndex: 'entityId',
            key: 'entityId',
        },
        {
            title: 'Department',
            dataIndex: 'department',
            key: 'department',
            render: (text) => text || "NIL"
        },
        {
            title: 'Course',
            dataIndex: 'course',
            key: 'course',
            render: (text) => text || "NIL"
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        }
    ];

    useEffect(() => {
        fetchData();
    }, [location.pathname]);

    return (
        <AdminPageLayout
            title="Users"
            actions={[
                <Button onClick={() => navigate(routePath.addUser)} type="primary">
                    Add User
                </Button>
            ]}
        >
            <div className="h-full flex flex-col">
                <Table
                    dataSource={data}
                    columns={columns}
                    scroll={{ y: 'calc(100vh - 250px)' }}
                    className="flex-1"
                />
                <Outlet context={{ refreshData: fetchData }} />
            </div>
        </AdminPageLayout>
    );
}