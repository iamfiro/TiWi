import NavBar from "../components/NavBar";
import { MdMap } from "react-icons/md";
import { GoHomeFill } from "react-icons/go";
import { FaBasketShopping } from "react-icons/fa6";

function PageHome() {
    return (
        <>
        <NavBar>
            <NavBar.Item name="동물병원" id="map" icon={<MdMap />} />
            <NavBar.Item name="홈" id="" icon={<GoHomeFill />} />
            <NavBar.Item name="쇼핑" id="shop" icon={<FaBasketShopping />} />
        </NavBar>
        </>
    );
}

export default PageHome;