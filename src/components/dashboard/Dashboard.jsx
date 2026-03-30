// components/dashboard/Dashboard.jsx
import { DashboardTitle } from './DashboardTitle';
import { DashboardStats } from './DashboardStats';
import { DashboardQuickActions } from './DashboardQuickActions';
import { DashboardMovements } from './DashboardMovements';

export function Dashboard() {
    return (
        <div className="p-5">
            <DashboardTitle />
            <DashboardStats />
            <DashboardQuickActions />
            <DashboardMovements />
        </div>
    );
}