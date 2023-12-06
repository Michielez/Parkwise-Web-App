import BottomNavigation from './components/BottomNavigation/BottomNavigation'
import Form from './components/LoginForm/LoginForm'
import styles from './page.module.css'
import Title from './components/Title/Title'

export default function Home() {
  return (
    <main className={styles.main}>
      <Title title={"Parkwise"}/>
      <Form />
      <BottomNavigation />
    </main>
  )
}
