import Head from 'next/head'
import DynamicTable from '@/components/DynamicTable'
import PaginationButtons from '@/components/Pagination'

const columns = [
  { id: 'name', label: 'Dessert (100g serving)', align: 'left' },
  { id: 'calories', label: 'Calories', align: 'right' },
  { id: 'fat', label: 'Fat (g)', align: 'right' },
]

const rows = [
  { name: 'Frozen yoghurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0 },
  { name: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37, protein: 4.3 },
  { name: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37, protein: 4.3 },
]

export default function Home() {
  return (
    <>
      <Head>
        <title>DeXy | Homepage</title>
      </Head>
      <main>
        <div style={{ marginTop: '10px' }}>
          <DynamicTable data={rows} columns={columns} />
          <PaginationButtons />
        </div>
      </main>
    </>
  )
}
