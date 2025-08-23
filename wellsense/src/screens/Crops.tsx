import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

export default function Crops() {
	return (
		<div className="space-y-4">
			<h2 className="text-2xl font-bold">Crop Calendar & Advisory</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<Card>
					<CardHeader>
						<CardTitle>Farmers & Crops</CardTitle>
					</CardHeader>
					<CardContent>
						<ul className="text-sm space-y-2">
							<li>Khushi → Paddy (flowering 🌾, high water demand), Groundnut 🌱</li>
							<li>Sanjeevi → Sugarcane</li>
							<li>Nikhil → Banana (fruiting 🍌, high water demand)</li>
							<li>Sriyaa → Cotton (flowering 🌸, moderate demand)</li>
						</ul>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Advisory</CardTitle>
					</CardHeader>
					<CardContent>
						<ul className="text-sm space-y-2">
							<li>Khushi: Paddy in flowering stage → irrigate daily.</li>
							<li>Nikhil: Apply potassium in 3 days.</li>
						</ul>
					</CardContent>
				</Card>
			</div>
			<Card>
				<CardHeader>
					<CardTitle>Calendar</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="h-64 grid place-items-center text-sm text-zinc-500">Calendar with irrigation/fertilizer milestones</div>
				</CardContent>
			</Card>
		</div>
	);
}