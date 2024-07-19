import { useEffect, useRef, useCallback } from "react";
import NavBar from "../components/NavBar";
import { MdMap, MdGpsFixed } from "react-icons/md";
import { GoHomeFill } from "react-icons/go";
import { FaBasketShopping } from "react-icons/fa6";
import useGeolocation from "../hooks/useGeolocation";
import ClinicMarker from '../../public/icons/clinic-marker.png';
import { DummyHospital } from "../dummy/hospital";
import style from '../styles/map.module.scss';
import { useNavigate } from "react-router-dom";

/**
 * PageMap 컴포넌트는 지도와 병원 마커를 표시하는 페이지입니다.
 * @component
 */
function PageMap() {
    const mapRef = useRef<HTMLDivElement>(null);
    const currentLocation = useGeolocation();
    const navigate = useNavigate();

    /**
     * 지도와 병원 마커를 초기화하는 함수입니다.
     * @param {object} location - 현재 위치 정보
     */
    const initializeMap = useCallback((location: { lat: number; lng: number }) => {
        const map = new naver.maps.Map(mapRef.current || '', {
            center: new naver.maps.LatLng(location.lat, location.lng),
            zoom: 17,
            mapTypeId: naver.maps.MapTypeId.NORMAL
        });

        DummyHospital.forEach(hospital => {
            const marker = new naver.maps.Marker({
                position: new naver.maps.LatLng(hospital.lat, hospital.lng),
                map: map,
                icon: {
                    url: ClinicMarker,
                    size: new naver.maps.Size(40, 40),
                    scaledSize: new naver.maps.Size(40, 40),
                    origin: new naver.maps.Point(0, 0),
                    anchor: new naver.maps.Point(15, 15)
                }
            });

            naver.maps.Event.addListener(marker, 'click', () => {
                navigate(`/hospital?name=${encodeURIComponent(hospital.name)}`);
            });
        });
    }, [navigate]);

    useEffect(() => {
        if (currentLocation.loaded) {
            initializeMap(currentLocation.coordinates || { lat: 37.5423, lng: 126.9706 });
        } else {
            initializeMap({ lat: 37.5423, lng: 126.9706 });
        }
    }, [currentLocation, initializeMap]);

    /**
     * 현재 위치로 지도를 이동시키는 함수입니다.
     */
    const handleCurrentLocation = () => {
        if (currentLocation.loaded) {
            initializeMap(currentLocation.coordinates || { lat: 37.5423, lng: 126.9706 });
        }
    };

    return (
        <>
            <main className={style.container}>
                <header className={style.header}>
                    <h1>펫팅</h1>
                </header>
                <button className={style.currentLocation} onClick={handleCurrentLocation}>
                    <MdGpsFixed size={20} />
                </button>
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