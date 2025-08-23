import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

export default function Community() {
	return (
		<div className="space-y-4">
			<h2 className="text-2xl font-bold">Community Hub</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<Card>
					<CardHeader>
						<CardTitle>Farmers</CardTitle>
					</CardHeader>
					<CardContent>
						<ul className="text-sm space-y-2">
							<li>👨 ‍🌾 Sanjeevi (Sugarcane)</li>
							<li>👩 Khushi (Paddy + Groundnut)</li>
							<li>👨 ‍🌾 Nikhil (Banana)</li>
							<li>👩 ‍🌾 Sriyaa (Cotton)</li>
						</ul>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Produce Updates</CardTitle>
					</CardHeader>
					<CardContent>
						<ul className="text-sm space-y-2">
							<li>Sanjeevi harvested 500kg Sugarcane</li>
							<li>Khushi sowed 1 acre Paddy</li>
						</ul>
					</CardContent>
				</Card>
			</div>
			<Card>
				<CardHeader>
					<CardTitle>Discussion</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="text-sm text-zinc-600 dark:text-zinc-300">Mock posts and announcements...</div>
				</CardContent>
			</Card>
		</div>
	);
}