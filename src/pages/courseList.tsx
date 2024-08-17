import style from '../styles/courseList.module.scss';
import TemplateNav from "../template/Nav.tsx";
import {Column, Row} from "../components";
import { FaRegCalendar } from "react-icons/fa";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import { collection, query, onSnapshot } from "firebase/firestore";
import { auth, db } from '../firebase/firebaseConfig.ts'
const elapsedTime = (date: number): string => {
	const start = new Date(date);
	const end = new Date();

	const seconds = Math.floor((end.getTime() - start.getTime()) / 1000);
	if (seconds < 60) return '방금 전';

	const minutes = seconds / 60;
	if (minutes < 60) return `${Math.floor(minutes)}분 전`;

	const hours = minutes / 60;
	if (hours < 24) return `${Math.floor(hours)}시간 전`;

	const days = hours / 24;
	if (days < 7) return `${Math.floor(days)}일 전`;

	return `${start.toLocaleDateString()}`;
};

interface Course {
    name: string;
    date: string;
    id: string;
}

const List = ({name, date, id}: Course) => {
    const navigate = useNavigate();

    return (
        <Column className={style.list} style={{ gap: '6px'}} onClick={() => {
            navigate(`/course/${id}`);
        }}>
            <span>{name}</span>
            <Row className={style.listDate}>
                <FaRegCalendar />
                <span>{elapsedTime(new Date(date).getTime())}</span>
            </Row>
        </Column>
    )
}

const PageCourseList = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        const q = query(collection(db, 'log'));

		const unsubscribe = onSnapshot(q, (snapshot: any) => {
			const data = snapshot.docs.map((doc: any) => {
                if (doc.data().userId == auth.currentUser?.uid) return { id: doc.id, ...doc.data() };
			}).filter((item: any) => item !== undefined);

			setData(data);

            console.log('data', data);
		});

		return () => {
			unsubscribe();
		};
    }, []);

    return (
        <>
            <main className={style.container}>
                <h1 className={style.title}>저장된 코스</h1>
                <Column style={{ marginTop: '20px', gap: '20px' }}>
                    {
                        isLoaded ? (
                            <span>불러오는 중</span>
                        ) : null
                    }
                    {
                        data.map((item: any, index) => {
                            console.log(item)
                            const courseName = item.courseName;

                            return (
                                <List key={index} name={courseName} date={item.createdDate.toDate().toString()} id={item.id} />
                            )
                        })
                    }
                </Column>
            </main>
            <TemplateNav isHome={false} />
        </>
    )
}

export default PageCourseList;