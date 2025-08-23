import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

export default function Motor() {
	return (
		<div className="space-y-4">
			<h2 className="text-2xl font-bold">Motor Health & Topology</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<Card>
					<CardHeader>
						<CardTitle>Runtime</CardTitle>
					</CardHeader>
					<CardContent>
						<div>Motor runtime today: 5.2 hours</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Maintenance</CardTitle>
					</CardHeader>
					<CardContent>
						<div>Predictive maintenance alert: Service due in 15 days</div>
					</CardContent>
				</Card>
			</div>
			<Card>
				<CardHeader>
					<CardTitle>Error Logs</CardTitle>
				</CardHeader>
				<CardContent>
					<ul className="text-sm list-disc pl-5">
						<li>Overheating detected (mock)</li>
						<li>Voltage drop (mock)</li>
					</ul>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Topology</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="h-64 grid place-items-center text-sm text-zinc-500">Well → Motor → Farms</div>
				</CardContent>
			</Card>
		</div>
	);
}