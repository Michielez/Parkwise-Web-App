import BottomNavigation from "../components/BottomNavigation/BottomNavigation"
import MapBox from "../components/MapBox/MapBox"
import MapBoxWithSearch from "../components/MapBoxWithSearch/MapBoxWithSearch"
export default function Search(){
    return(
        <>
        <main>
            <h1>Search</h1>
            <MapBoxWithSearch />
        </main>
        <BottomNavigation />
        </>
    )
}