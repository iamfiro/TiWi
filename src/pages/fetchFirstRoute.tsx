import Robot from '../assets/robot.png';
import axios from "axios";
import {useRecoilState} from "recoil";
import {vacationState} from "../store/vacation.ts";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const PageFetchFirstRoute = () => {
    const [userData, setUserData] = useRecoilState(vacationState);
    const navigate = useNavigate();

    const [state, setState] = useState('')

    console.log(userData);

    useEffect(() => {
        axios.get(`https://appjam.sunrin.kr/gemini?location=${userData.vacationName}&sleepDay=${userData.sleepTime}&day=${userData.sleepTime+1}`).then((res) => {
            setUserData({
                ...userData,
                aiData: res.data
            });
            if(res.data.error) {
                setState(res.data);
                throw new Error(res.data);
            }
            navigate('/chat');
        }).catch((err) => {
            setState(err.response)
            throw new Error(err)
        })
    }, []);

    return (
        <>
            <div style={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <img src={Robot} alt={"로봇"} className={'spinning'} />
                <h1 style={{
                    fontSize: '20px',
                    marginTop: '40px',
                    fontWeight: '600'
                }}>AI의 응답을 기다리는 중입니다</h1>
                <span style={{ opacity: 0.4}}>
                    AI 답변은 부정확한 정보를 표시할 수 있습니다
                    <br/>
                    {state}
                </span>
            </div>
        </>
    )
}

export default PageFetchFirstRoute;