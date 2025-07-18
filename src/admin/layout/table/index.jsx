/* eslint-disable react/prop-types */
import { Table } from "antd";

export default function EduBuddyTable({ data, columns, loading }) {

    return (
        <>
            <Table
                dataSource={data}
                columns={columns}
                loading={loading}
                pagination={false}
                scroll={{
                    y: 600
                }}
            />
        </>
    )
}
