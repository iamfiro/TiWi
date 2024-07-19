import NavBar from "../components/NavBar";
import { MdMap } from "react-icons/md";
import { GoHomeFill } from "react-icons/go";
import { FaBasketShopping } from "react-icons/fa6";
import { useEffect, useRef } from "react";
import style from '../styles/map.module.scss'
import { IoSearchSharp } from "react-icons/io5";

function PageMap() {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => { 
        // eslint-disable-next-line no-unused-vars
        const map = new naver.maps.Map(mapRef.current || '', {
            center: new naver.maps.LatLng(37.5423, 126.9706),
            zoom: 17,
            mapTypeId: naver.maps.MapTypeId.NORMAL
        });
    }, [])
    
    return (
        <>
            <main className={style.container}>
                <div className={style.inputBox}>
                    <IoSearchSharp size={20} />
                    <input type="text" placeholder="검색어를 입력하세요" />
                </div>
                <div ref={mapRef} style={{ width: '100%', height: '100%' }}></div>
            </main>
            <NavBar>
                <NavBar.Item name="동물병원" id="map" icon={<MdMap />} />
                <NavBar.Item name="홈" id="" icon={<GoHomeFill />} />
                <NavBar.Item name="쇼핑" id="shop" icon={<FaBasketShopping />} />
            </NavBar>
        </>
    );
}

export default PageMap;