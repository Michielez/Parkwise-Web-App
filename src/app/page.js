import BottomNavigation from './components/BottomNavigation/BottomNavigation'
import styles from './page.module.css'
import Title from './components/Title/Title'
import MapBox from './components/MapBox/MapBox'
export default function Home() {
  return (
    <>
    <main className={styles.main}>
      <Title title={"Parkwise"}/>
      <MapBox />
    </main>
    <BottomNavigation />
    </>
    
  )
}
