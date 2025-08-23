import { NavLink } from 'react-router-dom';
import { Droplets, Gauge, Sprout, CloudSun, Cog, Users, BarChart3 } from 'lucide-react';
import { cn } from '../lib/cn';

const links = [
	{ to: '/', label: 'Dashboard', icon: Gauge },
	{ to: '/irrigation', label: 'Irrigation', icon: Droplets },
	{ to: '/crops', label: 'Crops', icon: Sprout },
	{ to: '/weather', label: 'Weather', icon: CloudSun },
	{ to: '/motor', label: 'Motor', icon: Cog },
	{ to: '/community', label: 'Community', icon: Users },
	{ to: '/insights', label: 'Insights', icon: BarChart3 },
];

export function Sidebar() {
	return (
		<aside className="h-screen w-64 shrink-0 border-r bg-white/70 dark:bg-zinc-900/50 backdrop-blur p-4">
			<div className="mb-6">
				<div className="text-2xl font-bold text-brand">WellSense</div>
				<div className="text-xs text-zinc-500">Smart Community Well</div>
			</div>
			<nav className="space-y-1">
				{links.map(({ to, label, icon: Icon }) => (
					<NavLink
						key={to}
						to={to}
						className={({ isActive }) =>
							cn(
								'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800',
								isActive && 'bg-zinc-100 dark:bg-zinc-800 text-brand-dark'
							)
						}
					>
						<Icon className="h-5 w-5" />
						<span>{label}</span>
					</NavLink>
				))}
			</nav>
		</aside>
	);
}