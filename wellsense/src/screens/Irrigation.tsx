import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { useMock } from '../store/MockStore';

export default function Irrigation() {
	const { schedule, currentIndex, nextIndex } = useMock();
	const maxDuration = Math.max(...schedule.map((s) => s.duration_min));
	return (
		<div className="space-y-4">
			<h2 className="text-2xl font-bold">Irrigation Monitor</h2>
			<div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
				<Card>
					<CardHeader>
						<CardTitle>Timeline</CardTitle>
					</CardHeader>
					<CardContent>
						<ul className="space-y-3 text-sm">
							{schedule.map((item, idx) => {
								const width = Math.max(20, Math.round((item.duration_min / maxDuration) * 100));
								const isCurrent = idx === currentIndex;
								const isNext = idx === nextIndex;
								return (
									<li key={idx} className="">
										<div className="flex items-center justify-between">
											<div className="font-medium">
												{isCurrent ? 'Now' : isNext ? 'Next' : 'Then'} → {item.farm} ({item.crop})
											</div>
											<div>{item.duration_min} min</div>
										</div>
										<div className={`h-3 rounded ${isCurrent ? 'bg-green-500' : isNext ? 'bg-yellow-500' : 'bg-zinc-300 dark:bg-zinc-700'}`} style={{ width: `${width}%` }} />
									</li>
								);
							})}
						</ul>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Topology</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid gap-4">
							<div className="flex items-center gap-2">
								<div className="px-3 py-1 rounded bg-blue-500 text-white">Well</div>
								<div className="h-0.5 flex-1 bg-blue-500" />
								<div className="px-3 py-1 rounded bg-blue-500 text-white">Motor</div>
							</div>
							<div className="flex flex-wrap gap-3">
								{schedule.map((s, idx) => (
									<div key={s.farm} className={`px-3 py-1 rounded border ${idx === currentIndex ? 'bg-blue-100 border-blue-400 text-blue-800 dark:bg-blue-900/30' : idx === nextIndex ? 'bg-yellow-100 border-yellow-400 text-yellow-800 dark:bg-yellow-900/30' : 'bg-white/60 dark:bg-zinc-800/40'}`}>
										{s.farm}
									</div>
								))}
							</div>
							<div className="text-xs text-zinc-500">Active = blue, Upcoming = yellow</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}