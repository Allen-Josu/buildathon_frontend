import { Button, Drawer, Space } from "antd";
import { useNavigate } from "react-router-dom";

export default function EditDepartment() {

    const navigate = useNavigate()
    const onClose = () => {
        navigate(-1);
    };
    return (
        <>
            <Drawer
                width={600}
                title="Edit Department"
                onClose={onClose}
                open
                headerStyle={{ padding: "30px 24px" }}
                extra={
                    <Space className="h-24">
                        <Button type="primary"  >
                            Submit
                        </Button>
                    </Space>
                }
            >
                <Space direction="vertical" className="w-full" >

                </Space>
            </Drawer >
        </>
    )
}
