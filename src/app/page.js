import BottomNavigation from './components/BottomNavigation'
import SearchBar from './components/SearchBar'
import styles from './page.module.css'



export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Parkwise</h1>
      <SearchBar />
      <BottomNavigation />
    </main>
  )
}
