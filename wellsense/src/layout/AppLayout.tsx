import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export function AppLayout() {
	return (
		<div className="flex min-h-screen bg-gradient-to-br from-zinc-50 to-green-50 dark:from-zinc-950 dark:to-zinc-900 text-zinc-900 dark:text-zinc-100">
			<Sidebar />
			<main className="flex-1 p-6">
				<Outlet />
			</main>
		</div>
	);
}