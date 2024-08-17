import TemplateNav from "../template/Nav.tsx";
import style from '../styles/sleep.module.scss';
import {Column, Row} from "../components";
import {useRecoilState} from "recoil";
import {vacationState} from "../store/vacation.ts";
import { FaMapMarkerAlt } from "react-icons/fa";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const SleepTime = () => {
    const [userData, setUserData] = useRecoilState(vacationState);
    const [sleepTime, setSleepTime] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        setUserData({
            ...userData,
            sleepTime: sleepTime
        });
    }, [sleepTime]);

    return (
        <>
            <main className={style.container}>
                <h1 className={style.title}>여행 일자 설정</h1>
                <Row className={style.selectedVacation} style={{ gap: '15px'}}>
                    <img src={userData.vacationImage} />
                    <Column style={{ gap: '4px'}}>
                        <span>{userData.vacationName}</span>
                        <span className={style.selectedVacationLocation}><FaMapMarkerAlt size={13} /> {userData.vacationLocation}</span>
                    </Column>
                </Row>
                <Column className={style.sleepContainer}>
                    <button className={style.sleepButton} data-selected={sleepTime === 1}
                            onClick={() => setSleepTime(1)}>
                        1박 2일
                    </button>
                    <button className={style.sleepButton} data-selected={sleepTime === 2}
                            onClick={() => setSleepTime(2)}>
                        2박 3일
                    </button>
                    <button className={style.sleepButton} data-selected={sleepTime === 3}
                            onClick={() => setSleepTime(3)}>
                        3박 4일
                    </button>
                    <button className={style.sleepButton} data-selected={sleepTime === 4}
                            onClick={() => setSleepTime(4)}>
                        4박 5일
                    </button>
                    <button className={style.sleepButton} data-selected={sleepTime === 5}
                            onClick={() => setSleepTime(5)}>
                        5박 6일
                    </button>
                    <button className={style.sleepButton} data-selected={sleepTime === 6}
                            onClick={() => setSleepTime(6)}>
                        6박 7일
                    </button>
                </Column>
                <button className={style.submit} onClick={() => navigate('/fetchRoute')}>
                    여행 코스 짜기
                </button>
            </main>
            <TemplateNav isHome={true}/>
        </>
    )
}

export default SleepTime;