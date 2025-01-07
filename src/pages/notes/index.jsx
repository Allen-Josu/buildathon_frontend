import axios from 'axios'
import Header from '../../components/Header/header'
import PageLayout from '../../layouts'
import { useEffect, useState } from 'react'

export default function Notes() {

  const [data, setData] = useState()

  const fetchData = async () => {
    const response = await axios.get(`http://localhost:4000/newEntity?entity=notes`)
    setData(response.data.results)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <Header />
      <PageLayout title="Notes" data={data} />
    </>
  )
}
