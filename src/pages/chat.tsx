import style from '../styles/chat.module.scss';
import {useRecoilState} from "recoil";
import {Hotel, Place, TimeRanges, vacationState} from "../store/vacation.ts";
import {Column, Row} from "../components";
import {FaMapMarkerAlt} from "react-icons/fa";
import {FaPaperPlane} from "react-icons/fa6";
import {IoClose, IoMap} from "react-icons/io5";
import {useNavigate} from "react-router-dom";
import {useCallback, useEffect, useRef, useState} from "react";
import {createPortal} from "react-dom";
import axios from "axios";
import {BeatLoader} from "react-spinners";
import { auth, db } from '../firebase/firebaseConfig.ts';
import { addDoc, collection }  from 'firebase/firestore';

interface ChatMessage {
    sender: 'user' | 'ai';
    message: string;
}

const Chat = ({ sender, message }: ChatMessage) => {
    switch (sender) {
        case 'user':
            return (
                <Row style={{justifyContent: 'flex-end'}}>
                    <div className={style.userMessage}>{message}</div>
                </Row>
            );
        case 'ai':
            if(message === 'AI is typing...') {
                return (
                    <Row>
                        <div className={style.aiMessage}><BeatLoader color={'#aeaeae'} size={9} speedMultiplier={0.7} /></div>
                    </Row>
                );
            }
            return (
                <Row>
                    <div className={style.aiMessage}>{message}</div>
                </Row>
            );
    }
}

const PageChat = () => {
    const [userData, setUserData] = useRecoilState(vacationState);
    const [mapVisible, setMapVisible] = useState(false);
    const navigate = useNavigate();
    const mapRef = useRef<HTMLDivElement>(null);
    const [chattingData, setChattingData] = useState<ChatMessage[]>([]);
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    function handleChatting() {
    const userMessage = message;
    setMessage('');
    setIsSending(true);

    // Add user's message to the chat
    setChattingData(prev => [...prev, { sender: 'user', message: userMessage }]);

    // Add AI "typing..." message to the chat
    const typingMessage = { sender: 'ai', message: 'AI is typing...' };
    setChattingData(prev => [...prev, typingMessage]);

    // AI chat logic
    axios.post('https://appjam.sunrin.kr/gemini/fix', {
        course: userData.aiData,
        message: userMessage
    }).then((res) => {
        setUserData({
            ...userData,
            aiData: res.data
        });

        // Replace "AI is typing..." with the actual response
        setChattingData(prev => {
            const newChattingData = [...prev];
            const message = res.data.message;

            // Process the message to handle newlines
            const processedMessage = message.split('. ').join('.\n\n').replace(/\n/g, '\n\n');

            newChattingData[newChattingData.length - 1] = { sender: 'ai', message: processedMessage };
            return newChattingData;
        });
        setIsSending(false);
    }).catch((error) => {
        // Handle any errors
        console.error("Failed to get AI response:", error);
        setIsSending(false);
    });
}

    // aiData에서 course와 hotel을 가져옵니다.
    const courseData: Place[][] = userData.aiData.course;
    const hotelLocation: Hotel = userData.aiData.hotel;

    const initializeMap = useCallback(() => {
        if (mapRef.current) {
            const map = new naver.maps.Map(mapRef.current, {
                center: new naver.maps.LatLng(hotelLocation.address.lat, hotelLocation.address.lng),
                zoom: 12,
                mapTypeId: naver.maps.MapTypeId.NORMAL,
                zoomControl: true, // 확대/축소 버튼 활성화
                zoomControlOptions: {
                    position: naver.maps.Position.RIGHT_BOTTOM // 버튼 위치 설정
                }
            });

            // 색상 배열을 6일까지 확장하고, 색상을 보기 좋게 조정
            const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF', '#33FFF2'];

            courseData.forEach((dayCourse, dayIndex) => {
                let previousLocation = new naver.maps.LatLng(hotelLocation.address.lat, hotelLocation.address.lng);
                let lineCounter = 1;  // 날짜별로 선 번호를 초기화

                dayCourse.forEach((location) => {
                    const currentLocation = new naver.maps.LatLng(location.address.lat, location.address.lng);

                    // 각 경유지 사이에 Polyline 생성
                    const strokeColor = colors[dayIndex % colors.length];
                    const polyline = new naver.maps.Polyline({
                        map: map,
                        path: [previousLocation, currentLocation],
                        strokeColor: strokeColor,
                        strokeWeight: 5,
                        strokeOpacity: 0.7,
                        strokeStyle: 'solid',
                        strokeLineCap: 'round',
                        strokeLineJoin: 'round'
                    });

                    // Polyline의 중심 좌표 계산
                    const polylineCenter = new naver.maps.LatLng(
                        (previousLocation.lat() + currentLocation.lat()) / 2,
                        (previousLocation.lng() + currentLocation.lng()) / 2
                    );

                    // 중심에 텍스트 마커 추가 (몇 번째 선인지 표시)
                    new naver.maps.Marker({
                        position: polylineCenter,
                        map: map,
                        icon: {
                            content: `<div style="color: white; font-weight: bold; background-color: ${strokeColor}; font-size: 14px; padding: 2px 4px; border-radius: 100px;">
                                        ${lineCounter}
                                      </div>`,
                        },
                        zIndex: 1000
                    });

                    lineCounter += 1;  // 선 번호 증가

                    // InfoWindow 인스턴스 생성
                    const infoWindow = new naver.maps.InfoWindow({
                        content: '',
                        anchorSkew: true,
                        pixelOffset: new naver.maps.Point(10, -10),
                    });

                    // 경유지 마커 추가 및 클릭 이벤트 설정
                    const markerIcon = {
                        content: `<div class="map_marker" style="border: 1.5px solid ${strokeColor}">
                            <img src="/icons/${location.type}.png" width="25" alt="" />
                            <span>${location.name}</span>
                        </div>`
                    };

                    const marker = new naver.maps.Marker({
                        position: currentLocation,
                        map: map,
                        icon: markerIcon,
                        zIndex: 1000 // Ensures the marker is above the polyline
                    });

                    // 마커 클릭 이벤트 추가
                    naver.maps.Event.addListener(marker, 'click', () => {
                        const timeRange = location.time as TimeRanges;
                        infoWindow.setContent(`<div style="padding:10px; font-size:14px;">
                            <b>${location.name}</b><br/>
                            ${timeRange.start} - ${timeRange.end}
                        </div>`);
                        infoWindow.open(map, marker);
                    });

                    // 다음 경유지의 이전 위치로 현재 위치를 설정
                    previousLocation = currentLocation;
                });

                // Bounds 설정
                let bounds = new naver.maps.LatLngBounds();
                dayCourse.forEach((location) => {
                    bounds.extend(new naver.maps.LatLng(location.address.lat, location.address.lng));
                });
                map.fitBounds(bounds);

                // 호텔 마커 추가 (시간 정보 없음)
                const hotelMarker = new naver.maps.Marker({
                    position: new naver.maps.LatLng(hotelLocation.address.lat, hotelLocation.address.lng),
                    map: map,
                    icon: {
                        content: `<div class="map_marker" style="border: 2px solid mediumpurple">
                                    <img src="/icons/hotel.png" width="30" alt="호텔" />
                                    <span>${hotelLocation.name}</span>
                                  </div>`
                    },
                    zIndex: 1000
                });

                // 호텔 마커 클릭 이벤트 추가
                naver.maps.Event.addListener(hotelMarker, 'click', () => {
                    infoWindow.setContent(`<div style="padding:10px; font-size:14px;">
                        <b>${hotelLocation.name}</b>
                    </div>`);
                    infoWindow.open(map, hotelMarker);
                });
            });

            console.log("Map and polylines are successfully initialized.");
        } else {
            console.error("Map initialization failed because mapRef.current is null or undefined");
        }
    }, [courseData, hotelLocation]);

    useEffect(() => {
        if (mapVisible) {
            initializeMap();
        }
    }, [initializeMap, mapVisible]);

    useEffect(() => {
        // 채팅 데이터가 업데이트 될 때마다 실행
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;  // 가장 아래로 스크롤
        }
    }, [chattingData]);

    const handleClickComplete = async () => {
        await addDoc(collection(db, 'log'), {
            userId: auth.currentUser?.uid,
            courseName: userData.vacationName,
            createdDate: new Date(),
            json: JSON.stringify(userData.aiData)
        });

        navigate('/course');
    }

    return (
        <>
            <div className={style.wrap}>
                <header className={style.header}>
                    <Row style={{justifyContent: 'space-between'}}>
                        <Row style={{gap:'15px'}}>
                            <img src={userData.vacationImage} className={style.thumbnail} alt={'ㅇ'}/>
                            <Column style={{ gap: '4px'}}>
                                <span>{userData.vacationName} · {userData.sleepTime}박 {userData.sleepTime+1}일</span>
                                <span className={style.selectedVacationLocation}><FaMapMarkerAlt size={11} /> {userData.vacationLocation}</span>
                            </Column>
                        </Row>
                        <div className={style.aiTag}>AI 채팅</div>
                    </Row>
                    <Row className={style.navigateButton}>
                        <button onClick={() => navigate('/')}>나가기</button>
                        <button onClick={async () => {
                            await handleClickComplete()
                        }}>완료하기</button>
                    </Row>
                </header>
                <main className={style.container}>
                    <Column style={{ height: 'calc(100% - 65px)', overflowY: 'scroll',whiteSpace: 'pre-line'}} ref={chatContainerRef}>
                        {
                            chattingData.map((chat, index) => (
                                <Chat key={index} sender={chat.sender} message={chat.message} />
                            ))
                        }
                    </Column>
                    <Row className={style.userInput} style={{gap: '6px'}}>
                        <input value={message} placeholder={'원하는 여행 코스를 입력해주세요'} onChange={(e) => setMessage(e.target.value)}/>
                        <button disabled={isSending} onClick={() => {
                            if(message) {
                                handleChatting();
                            }
                        }}>
                            <FaPaperPlane color={'white'} size={16}/>
                        </button>
                        <button onClick={() => setMapVisible(true)}>
                            <IoMap color={'white'} size={16}/>
                        </button>
                    </Row>
                </main>
            </div>
            {mapVisible && (
                createPortal(
                    <>
                        <div className={style.backdrop} onClick={() => setMapVisible(false)}>
                            <section className={style.mapModal} onClick={(e) => e.stopPropagation()}>
                                <header>
                                    <h2>지도 경로</h2>
                                    <button onClick={() => setMapVisible(false)}><IoClose /></button>
                                </header>
                                <div className={style.map} ref={mapRef}>
                                    {/* This is where the map will be rendered */}
                                </div>
                            </section>
                        </div>
                    </>, document.body
                )
            )}
        </>
    );
}

export default PageChat;