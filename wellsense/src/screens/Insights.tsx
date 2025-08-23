import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

export default function Insights() {
	return (
		<div className="space-y-4">
			<h2 className="text-2xl font-bold">Insights & Reports</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
				<Card>
					<CardHeader>
						<CardTitle>Water Saved</CardTitle>
					</CardHeader>
					<CardContent>430 liters 💧</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Energy Saved</CardTitle>
					</CardHeader>
					<CardContent>3.1 kWh ⚡</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Carbon Footprint</CardTitle>
					</CardHeader>
					<CardContent>12kg CO₂ 🌍</CardContent>
				</Card>
			</div>
			<Card>
				<CardHeader>
					<CardTitle>Fairness Index</CardTitle>
				</CardHeader>
				<CardContent>✅ Balanced – All farmers irrigated equally within 24h</CardContent>
			</Card>
		</div>
	);
}