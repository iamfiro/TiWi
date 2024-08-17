import style from '../styles/courseDetail.module.scss';
import axios from "axios";
import {useEffect, useState} from "react";
import TemplateNav from "../template/Nav.tsx";
import {Column, Row} from "../components";
import Way from '../assets/way.png';
import SightSeeing from '../../public/icons/sightseeing.png';
import End from '../assets/end.png';
import Left from '../assets/left.png';
import Right from '../assets/right.png';

interface NavigateProps {
    id: number;
    name: string;
    duration: string;
    distance: string;
}

function numberToDistanceString(distance: number) {
    if (distance < 1000) {
        return `${distance}m`;
    }
    return `${(distance / 1000).toFixed(1)}km`;
}

function numberToTimeString(time: number) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);

    if(hours === 0 && minutes === 0) {
        return '1분 미만';
    }

    if(hours === 0) {
        return `${minutes}분`;
    }
    return `${hours}시간 ${minutes}분`;
}

const RouteNavigate = ({id, name, distance, duration}: NavigateProps) => {
    console.log(duration)
    let icon = '';

    if(id === 2 || id === 3) {
        icon = Way;
    } else if(id === 87) {
        icon = SightSeeing;
    } else if(id === 88) {
        icon = End;
    } else if(id === 4) {
        icon = Left;
    } else if(id === 5) {
        icon = Right;
    }

    return (
        <Row className={style.navigate} style={{gap: '20px'}}>
            <img src={icon} alt={name} />
            <Column style={{gap: '5px'}}>
                <span className={style.name}>{name}</span>
                <span className={style.data}>{numberToDistanceString(Number(distance))} · {numberToTimeString(Number(duration)/1000)}</span>
            </Column>
        </Row>
    )
}

const PageCourseDetail = () => {
     const [routes, setRoutes] = useState<any[]>([]); // All route data state variable
    const [loading, setLoading] = useState(true);  // Loading state variable

    // Dummy API data
    const dummyApi = {
        "course": [
            [
                {
                    "address": {
                        "lat": 37.566582,
                        "lng": 126.988059
                    },
                    "name": "N서울타워",
                    "time": {
                        "end": "12:00",
                        "start": "10:00"
                    },
                    "type": "sightseeing"
                },
                {
                    "address": {
                        "lat": 37.567412,
                        "lng": 126.99026
                    },
                    "name": "더플레이스 다이닝 남산",
                    "time": {
                        "end": "13:00",
                        "start": "12:00"
                    },
                    "type": "food"
                },
                {
                    "address": {
                        "lat": 37.566327,
                        "lng": 126.985577
                    },
                    "name": "남산 케이블카",
                    "time": {
                        "end": "15:00",
                        "start": "14:00"
                    },
                    "type": "sightseeing"
                },
                {
                    "address": {
                        "lat": 37.664236,
                        "lng": 126.986524
                    },
                    "name": "목멱산방",
                    "time": {
                        "end": "16:00",
                        "start": "15:00"
                    },
                    "type": "food"
                }
            ],
            [
                {
                    "address": {
                        "lat": 37.55134,
                        "lng": 126.98804
                    },
                    "name": "국립극장",
                    "time": {
                        "end": "12:00",
                        "start": "10:00"
                    },
                    "type": "sightseeing"
                },
                {
                    "address": {
                        "lat": 37.550666,
                        "lng": 126.985868
                    },
                    "name": "하모니마트",
                    "time": {
                        "end": "13:00",
                        "start": "12:00"
                    },
                    "type": "shopping"
                },
                {
                    "address": {
                        "lat": 37.552082,
                        "lng": 126.989189
                    },
                    "name": "리틀넥 남산",
                    "time": {
                        "end": "14:00",
                        "start": "13:00"
                    },
                    "type": "food"
                }
            ]
        ],
        "hotel": {
            "address": {
                "lat": 37.55763,
                "lng": 126.99057
            },
            "name": "그랜드 하얏트 서울"
        }
    };

    const fetchRoutes = async () => {
        const courseData = dummyApi.course;
        const hotel = dummyApi.hotel;
        const allRoutes: any[] = [];

        for (let dayIndex = 0; dayIndex < courseData.length; dayIndex++) {
            const dayCourse = courseData[dayIndex];

            if (dayCourse.length > 1) {
                const start = hotel;  // 호텔을 출발지로 설정
                const end = dayCourse[dayCourse.length - 1];  // 그날의 마지막 장소를 도착지로 설정

                // 중간 경유지들을 waypoints로 설정, 첫 번째 장소와 마지막 장소는 제외
                const waypoints = dayCourse.slice(0, -1).map((location) => {
                    const { lat, lng } = location.address;
                    return `${lng},${lat},name=${location.name}`;
                }).join(':');

                try {
                    const response = await axios.get('https://appjam.sunrin.kr/driving', {
                        params: {
                            start: `${start.address.lng},${start.address.lat}`,
                            goal: `${end.address.lng},${end.address.lat}`,
                            waypoints: waypoints || undefined,  // waypoints가 없을 경우 undefined로 설정
                        },
                    });

                    allRoutes.push({
                        day: dayIndex + 1,
                        startName: start.name,
                        endName: end.name,
                        waypoints: waypoints,
                        route: response.data.route
                    });

                } catch (error) {
                    console.error("Error fetching route:", error);
                }
            }
        }
        console.log(allRoutes);
        setRoutes(allRoutes);
        setLoading(false);
    };


    useEffect(() => {
        fetchRoutes();
    }, []);

    return (
        <>
            <div className={style.container}>
                <header className={style.header}>
                    <h1 className={style.title}>N남산타워 코스</h1>
                </header>
                {
                    loading ? (
                        <span>로딩 중</span>
                    ) : null
                }
                {routes.map((route, index) => (
                    <Column key={index}>
                        <Row className={style.date} style={{justifyContent: 'space-between'}}>
                            <span>{index + 1}일차 경로</span>
                            <span>{Math.floor(Number(route.route.traoptimal[0].summary.distance) / 1000)}km</span>
                        </Row>
                        {route.route.traoptimal[0].guide.map((guide: any, index: number) => {
                                return <RouteNavigate
                                    key={index}
                                    id={guide.type}
                                    name={guide.instructions}
                                    distance={guide.distance}
                                    duration={guide.duration}
                                />
                        })}
                    </Column>
                ))}
            </div>
            <TemplateNav isHome={false}/>
        </>
    );
}

export default PageCourseDetail;