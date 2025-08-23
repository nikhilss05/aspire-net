import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';

export type Farmer = {
	name: string;
	crop: string;
	stage: string;
	water_need: 'low' | 'moderate' | 'high';
};

export type IoTReadings = {
	soil_moisture: number; // %
	temp: number; // C
	humidity: number; // %
	tank_level: number; // %
	motor_status: 'ON' | 'OFF';
};

export type ScheduleItem = {
	farm: string;
	crop: string;
	start_time: number; // ms epoch simulated
	duration_min: number;
	priority_score: number; // higher first
};

export type WeatherDay = { day: string; condition: string; temp: number; rain_chance: number };

export type MotorHealth = { runtime_hours: number; maintenance_due_days: number; error_logs: string[] };

export type CommunityPost = { author: string; content: string; ts: number };
export type ProduceUpdate = { farmer: string; update: string; ts: number };

export type MockState = {
	farmers: Farmer[];
	iot: IoTReadings;
	schedule: ScheduleItem[];
	currentIndex: number;
	nextIndex: number;
	slotEndsAt: number;
	weather: WeatherDay[];
	motor: MotorHealth;
	community: { posts: CommunityPost[]; produce: ProduceUpdate[] };
};

const MockContext = createContext<MockState | null>(null);

const INITIAL_FARMERS: Farmer[] = [
	{ name: 'Khushi', crop: 'Paddy', stage: 'flowering', water_need: 'high' },
	{ name: 'Sanjeevi', crop: 'Sugarcane', stage: 'growing', water_need: 'high' },
	{ name: 'Nikhil', crop: 'Banana', stage: 'fruiting', water_need: 'high' },
	{ name: 'Sriyaa', crop: 'Cotton', stage: 'flowering', water_need: 'moderate' },
];

const INITIAL_WEATHER: WeatherDay[] = [
	{ day: 'Today', condition: 'Sunny', temp: 34, rain_chance: 10 },
	{ day: 'Tomorrow', condition: 'Rain', temp: 30, rain_chance: 70 },
	{ day: 'Day after', condition: 'Cloudy', temp: 31, rain_chance: 30 },
];

function createInitialSchedule(now: number): ScheduleItem[] {
	const base: Omit<ScheduleItem, 'start_time'>[] = [
		{ farm: 'Sanjeevi', crop: 'Sugarcane', duration_min: 50, priority_score: 0.9 },
		{ farm: 'Khushi', crop: 'Paddy', duration_min: 30, priority_score: 0.95 },
		{ farm: 'Nikhil', crop: 'Banana', duration_min: 40, priority_score: 0.85 },
		{ farm: 'Sriyaa', crop: 'Cotton', duration_min: 25, priority_score: 0.7 },
	];
	let cursor = now;
	return base.map((b) => {
		const item: ScheduleItem = { ...b, start_time: cursor };
		cursor += b.duration_min * 60_000;
		return item;
	});
}

export function MockProvider({ children }: { children: React.ReactNode }) {
	const [farmers] = useState(INITIAL_FARMERS);
	const [weather] = useState(INITIAL_WEATHER);
	const [iot, setIot] = useState<IoTReadings>({ soil_moisture: 42, temp: 31, humidity: 64, tank_level: 70, motor_status: 'ON' });
	const [motor, setMotor] = useState<MotorHealth>({ runtime_hours: 5.2, maintenance_due_days: 15, error_logs: [] });

	const speed = 60; // 1s = 60s simulated
	const startReal = useRef(Date.now());
	const [schedule, setSchedule] = useState<ScheduleItem[]>(() => createInitialSchedule(getSimTime()))
	const [currentIndex, setCurrentIndex] = useState(0);
	const [slotEndsAt, setSlotEndsAt] = useState(schedule[0].start_time + schedule[0].duration_min * 60_000);

	function getSimTime() {
		const elapsedReal = Date.now() - startReal.current;
		return Date.now() + elapsedReal * (speed - 1);
	}

	useEffect(() => {
		const id = setInterval(() => {
			const simNow = getSimTime();
			// Slot rotation
			if (simNow >= slotEndsAt) {
				const nextIdx = (currentIndex + 1) % schedule.length;
				// Rebuild schedule start times from now for clarity
				const newSchedule = schedule.map((_, idx) => {
					const order = (nextIdx + idx) % schedule.length;
					return { ...schedule[order], start_time: simNow + schedule.slice(nextIdx, nextIdx + idx).reduce((acc, it) => acc + it.duration_min * 60_000, 0) };
				});
				setSchedule(newSchedule);
				setCurrentIndex(0);
				setSlotEndsAt(newSchedule[0].start_time + newSchedule[0].duration_min * 60_000);
			}

			// IoT fluctuations
			setIot((prev) => {
				const motorOn = true;
				const tankDelta = motorOn ? -Math.random() * 0.4 : Math.random() * 0.2;
				const newTank = Math.max(10, Math.min(100, prev.tank_level + tankDelta));
				return {
					soil_moisture: Math.max(10, Math.min(90, prev.soil_moisture + (Math.random() - 0.5) * 1.2)),
					temp: Math.max(20, Math.min(40, prev.temp + (Math.random() - 0.5) * 0.6)),
					humidity: Math.max(30, Math.min(90, prev.humidity + (Math.random() - 0.5) * 1.0)),
					tank_level: newTank,
					motor_status: 'ON',
				};
			});

			// Accumulate motor runtime when ON
			setMotor((m) => ({ ...m, runtime_hours: Math.round((m.runtime_hours + (1 / 3600) * speed) * 100) / 100 }));
		}, 1000);
		return () => clearInterval(id);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentIndex, schedule, slotEndsAt]);

	// Adjust durations slightly if high rain chance tomorrow (simulate ML scheduling impact)
	useEffect(() => {
		const rainTomorrow = weather[1]?.rain_chance ?? 0;
		if (rainTomorrow >= 60) {
			setSchedule((sch) => sch.map((s) => ({ ...s, duration_min: Math.round(s.duration_min * 0.8) })));
		}
	}, [weather]);

	const nextIndex = (currentIndex + 1) % schedule.length;

	const value: MockState = useMemo(
		() => ({ farmers, iot, schedule, currentIndex, nextIndex, slotEndsAt, weather, motor, community: {
			posts: [
				{ author: 'Admin', content: 'Water audit meeting at 6 PM today.', ts: Date.now() - 3600_000 },
			],
			produce: [
				{ farmer: 'Sanjeevi', update: 'Harvested 500kg Sugarcane', ts: Date.now() - 7200_000 },
				{ farmer: 'Khushi', update: 'Sowed 1 acre Paddy', ts: Date.now() - 10800_000 },
			],
		} }),
		[farmers, iot, schedule, currentIndex, nextIndex, slotEndsAt, weather, motor]
	);

	return <MockContext.Provider value={value}>{children}</MockContext.Provider>;
}

export function useMock() {
	const ctx = useContext(MockContext);
	if (!ctx) throw new Error('MockProvider missing');
	return ctx;
}