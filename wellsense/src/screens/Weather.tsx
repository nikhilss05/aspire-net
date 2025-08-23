import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

export default function Weather() {
	return (
		<div className="space-y-4">
			<h2 className="text-2xl font-bold">Weather Center</h2>
			<Card>
				<CardHeader>
					<CardTitle>3-day Forecast</CardTitle>
				</CardHeader>
				<CardContent>
					<ul className="text-sm space-y-2">
						<li>Today: Sunny, 34°C</li>
						<li>Tomorrow: 70% chance of rainfall 🌧️</li>
						<li>Day after: Cloudy, 31°C</li>
					</ul>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Alerts</CardTitle>
				</CardHeader>
				<CardContent>
					<div>Rain expected tomorrow – irrigation plan adjusted.</div>
				</CardContent>
			</Card>
		</div>
	);
}