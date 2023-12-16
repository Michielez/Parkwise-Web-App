import BottomNavigation from './components/BottomNavigation/BottomNavigation'
import styles from './page.module.css'
import Title from './components/Title/Title'

export default function Home() {
  return (
    <>
    <main className={styles.main}>
      <Title title={"Parkwise"}/>
    </main>
    <BottomNavigation />
    </>
    
  )
}
