import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { motion } from 'framer-motion';
import { useMock } from '../store/MockStore';
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { useMemo } from 'react';

export default function Dashboard() {
	const { iot, schedule, currentIndex, nextIndex, weather } = useMock();

	const tankData = useMemo(() => [{ name: 'Tank', value: Math.round(iot.tank_level) }], [iot.tank_level]);
	const moistureSeries = useMemo(() => {
		// synthesize a small history for demo
		const now = Date.now();
		return Array.from({ length: 12 }).map((_, i) => ({
			t: new Date(now - (12 - i) * 60_000).toLocaleTimeString([], { minute: '2-digit', hour: '2-digit' }),
			value: Math.max(10, Math.min(90, iot.soil_moisture + (i - 6) * 0.8)),
		}));
	}, [iot.soil_moisture]);

	const current = schedule[currentIndex];
	const next = schedule[nextIndex];
	const hasRainAlert = (weather[1]?.rain_chance ?? 0) >= 60;

	return (
		<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
			<h2 className="text-2xl font-bold">👋 Welcome back, Khushi</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
				<Card>
					<CardHeader>
						<CardTitle>Tank Water Level</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="h-40">
							<ResponsiveContainer width="100%" height="100%">
								<RadialBarChart innerRadius="70%" outerRadius="100%" data={tankData} startAngle={180} endAngle={0}>
									<PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
									<RadialBar background dataKey="value" fill="#16a34a" cornerRadius={10} />
								</RadialBarChart>
							</ResponsiveContainer>
						</div>
						<div className="text-center text-sm mt-1">{Math.round(iot.tank_level)}% full</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Motor Status</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-1">
							<div className="text-lg">{iot.motor_status}</div>
							<div className="text-sm text-zinc-500">Runtime today: 5.2 hours</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Irrigation Schedule</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-2 text-sm">
							<div>Current: <span className="font-medium">Farm – {current.farm} ({current.crop})</span></div>
							<div>Next: <span className="font-medium">{next.farm} ({next.crop})</span></div>
						</div>
					</CardContent>
				</Card>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<Card>
					<CardHeader>
						<CardTitle>Weather Alert</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-zinc-700 dark:text-zinc-300">{hasRainAlert ? '🌧 Rain expected tomorrow – irrigation reduced by 20%' : 'No rain alerts'}</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Soil Moisture Trend</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="h-48">
							<ResponsiveContainer width="100%" height="100%">
								<LineChart data={moistureSeries}>
									<XAxis dataKey="t" hide />
									<YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} width={30} />
									<Tooltip formatter={(v: any) => `${Math.round(v)}%`} />
									<Line type="monotone" dataKey="value" stroke="#16a34a" strokeWidth={2} dot={false} />
								</LineChart>
							</ResponsiveContainer>
						</div>
						<div className="grid grid-cols-2 gap-2 text-sm mt-2">
							<div>Temp: {Math.round(iot.temp)}°C</div>
							<div>Humidity: {Math.round(iot.humidity)}%</div>
							<div>Soil moisture: {Math.round(iot.soil_moisture)}%</div>
							<div>Tank: {Math.round(iot.tank_level)}%</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</motion.div>
	);
}