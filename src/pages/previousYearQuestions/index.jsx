import PageLayout from "../../layouts";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header/Header";

export default function PreviousYear() {
    const [data, setData] = useState()

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`http://localhost:4000/newEntity?entity=pyq`)
            setData(response.data.results)
        }
        fetchData()
    }, [])

    return (
        <>
            <Header />
            <PageLayout title="PYQ" data={data} />
        </>
    )
}
