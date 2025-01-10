import axios from 'axios';
import PageLayout from '../../layouts';
import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';

const BASE_URL = import.meta.env.VITE_URL;

export default function Notes() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/newEntity?entity=notes`);
      setData(response.data.results);
    } catch (error) {
      setError('Failed to fetch notes', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Header />
      <PageLayout title="Notes" data={data} />
    </>
  );
}
