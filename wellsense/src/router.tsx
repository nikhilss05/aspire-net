import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './layout/AppLayout';
import Dashboard from './screens/Dashboard';
import Irrigation from './screens/Irrigation';
import Crops from './screens/Crops';
import Weather from './screens/Weather';
import Motor from './screens/Motor';
import Community from './screens/Community';
import Insights from './screens/Insights';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <AppLayout />,
		children: [
			{ index: true, element: <Dashboard /> },
			{ path: 'irrigation', element: <Irrigation /> },
			{ path: 'crops', element: <Crops /> },
			{ path: 'weather', element: <Weather /> },
			{ path: 'motor', element: <Motor /> },
			{ path: 'community', element: <Community /> },
			{ path: 'insights', element: <Insights /> },
		],
	},
]);