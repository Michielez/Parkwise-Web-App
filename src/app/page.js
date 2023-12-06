import BottomNavigation from './components/BottomNavigation/BottomNavigation'
import Form from './components/LoginForm/LoginForm'
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
