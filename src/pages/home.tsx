import TemplateNav from "../template/Nav.tsx";
import style from '../styles/home.module.scss';
import Logo from '../assets/logo.svg';
import { IoSearchSharp } from "react-icons/io5";
import {Column, Row} from "../components";
import  {useNavigate} from "react-router-dom";
import {useRecoilState} from "recoil";
import {vacationState} from "../store/vacation.ts";


interface Vacation {
    id: string;
    title: string;
    location: string;
    image: string;
}

function Vacation({id, title, location, image}: Vacation) {
    const [userData, setUserData] = useRecoilState(vacationState);
    const navigate = useNavigate();
    return (
        <>
            <article className={style.vacation} onClick={() => {
                navigate('/sleep');
                setUserData({
                    ...userData,
                    startedVacationId: id,
                    vacationName: title,
                    vacationLocation: location,
                    vacationImage: image,
                })
            }}>
                <img src={image} alt={'s'} />
                <Row style={{ alignItems: 'center', justifyContent: 'space-between', marginTop: '12px'}}>
                    <span>{title}</span>
                    <span className={style.vacationLocation}>{location}</span>
                </Row>
            </article>
        </>
    )
}

function PageHome() {
    return (
        <>
            <div className={style.container}>
                <img src={Logo} className={style.icon}/>
                <div className={style.input}>
                    <IoSearchSharp/>
                    <input placeholder={'검색어를 입력해주세요'}></input>
                </div>
                <div className={style.mola}/>
                <h1 className={style.title}>
                    화창한 날 이런 여행 어때요
                </h1>
                <div style={{height: '20px'}}/>
                <Column style={{ gap: '30px'}}>
                    <Vacation
                        id={'1'}
                        title={'동해 앞바다'}
                        location={'인천'}
                        image={'https://lh4.googleusercontent.com/proxy/3VAq7fgLd9e8Wr7VJj0JoMd8I9fHNKZUQiqbNHK1_AgRGlCVyMuXjw4MWeUF54WvC0BuAsNt8cR-8zBAKD6PQNoRakabBcD7RBLutmqXvX1RbPvSehBCeJrGRWAugafe-suHq_5i1LILmV2okqPOzealJlzyRjw'}
                    />
                    <Vacation
                        id={'1'}
                        title={'N서울타워'}
                        location={'서울시 용산'}
                        image={'https://mono.aks.ac.kr/s/media/da/da2261da-8010-4b0a-a99e-9fd909c3234d.jpg?preset=page'}
                    />
                    <Vacation
                        id={'1'}
                        title={'N서울타워'}
                        location={'서울시 용산'}
                        image={'https://mono.aks.ac.kr/s/media/da/da2261da-8010-4b0a-a99e-9fd909c3234d.jpg?preset=page'}
                    />
                    <Vacation
                        id={'1'}
                        title={'N서울타워'}
                        location={'서울시 용산'}
                        image={'https://mono.aks.ac.kr/s/media/da/da2261da-8010-4b0a-a99e-9fd909c3234d.jpg?preset=page'}
                    />
                </Column>
            </div>
            <TemplateNav isHome={true}/>
        </>
    );
}

export default PageHome;