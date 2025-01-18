import { Card, Drawer, Space, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_URL;

export default function ViewDepartment() {
    const [data, setData] = useState(null)

    const { entityId } = useParams();
    const navigate = useNavigate();

    const onClose = () => {
        navigate(-1);
    };

    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await axios.get(`${BASE_URL}/departments?entity=departments&entityId=${entityId}`)
                setData(response.data.results)
            }
            catch (error) {
                console.log(error);

            }
        }
        fetchData()
    }, [entityId])

    const columns = [
        {
            title: "Subject Name",
            dataIndex: 'subjectName',
            key: "subjectName",
            width: 100
        },
        {
            title: "Subject Code",
            dataIndex: 'subjectCode',
            key: "subjectCode",
            width: 100
        },
    ];




    return (
        <>
            <Drawer
                width={600}
                title="View Department"
                onClose={onClose}
                open
                headerStyle={{ padding: "30px 24px" }}

            >
                <Space direction="vertical" className="w-full gap-10">
                    <Card>
                        <Card.Grid hoverable={false} style={{ width: "35%" }}>
                            Department
                        </Card.Grid>
                        <Card.Grid hoverable={false} style={{ width: "65%" }}>
                            {data?.department}
                        </Card.Grid>
                        <Card.Grid hoverable={false} style={{ width: "35%" }}>
                            Course
                        </Card.Grid>
                        <Card.Grid hoverable={false} style={{ width: "65%" }}>
                            {data?.course}
                        </Card.Grid>
                        <Card.Grid hoverable={false} style={{ width: "35%" }}>
                            Semester
                        </Card.Grid>
                        <Card.Grid hoverable={false} style={{ width: "65%" }}>
                            {data?.semester}
                        </Card.Grid>
                    </Card>
                    <Table pagination={false} dataSource={data?.subjects} columns={columns} />
                </Space>
            </Drawer >
        </>
    )
}
