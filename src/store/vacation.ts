import {atom} from "recoil";

export interface Address {
  lat: number;
  lng: number;
}

export interface Place {
  address: Address;
  name: string;
  time: TimeRanges; // 타입을 명확하게 정의할 수 있으면 해주세요. 예: string, Date, etc.
  type: 'sightseeing' | 'food';
}

export interface Hotel {
  address: Address;
  name: string;
}

export interface TimeRanges {
    start: string;
    end: string;
}

export interface Course {
  course: Place[][];
  hotel: Hotel;
}
export const vacationState = atom({
      key: 'userVacation',
      default: {
          startedVacationId: '',
          vacationName: '',
          vacationImage: '',
          vacationLocation: '',
          sleepTime: 0,
          aiData: {} as Course,
      },
});