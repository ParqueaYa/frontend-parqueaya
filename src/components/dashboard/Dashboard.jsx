// components/dashboard/Dashboard.jsx
import { DashboardTitle } from './DashboardTitle';
import { DashboardStats } from './DashboardStats';
import { DashboardMovements } from './DashboardMovements';

export function Dashboard() {
    return (
        <div className="p-1">
            <DashboardTitle />
            <DashboardStats />
            <DashboardMovements />
        </div>
    );
}