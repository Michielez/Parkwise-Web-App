import BottomNavigation from './components/BottomNavigation/BottomNavigation'
import SearchBar from './components/SearchBar/SearchBar'
import Card from './components/Card/Card'
import Form from './components/Form/Form'
import styles from './page.module.css'


export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Parkwise</h1>
      <Form />
      <BottomNavigation />
    </main>
  )
}
