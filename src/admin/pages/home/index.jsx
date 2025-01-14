/* eslint-disable react/jsx-key */
import AdminPageLayout from "../../layout";
import { useState } from "react";
import { Button } from "antd";




export default function AdminHomePage() {
    const [active, setActive] = useState(null)


    return (
        <>
            <AdminPageLayout title="Dashboard"
                actions={[<Button type="primary" className=" w-40 border-none text-[#c1c3c8]  cursor-pointer ">Add Inventory</Button>
                ]}
                active={active}
                setActive={setActive}
            >
                <p>Hello</p>

            </AdminPageLayout>
        </>
    )
}
