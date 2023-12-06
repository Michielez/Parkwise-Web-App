import BottomNavigation from './components/BottomNavigation'
import SearchBar from './components/SearchBar'
import Card from './components/Card'
import styles from './page.module.css'


export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Parkwise</h1>
      <SearchBar />
      <BottomNavigation />
      <Card title='Hello'>
        <p>Test</p>
      </Card>
    </main>
  )
}
