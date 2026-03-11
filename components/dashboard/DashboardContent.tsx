'use client';

import { useDashboardStats } from '@/hooks/useDashboardStats';
import { DashboardStatsCards } from './widgets/DashboardStatsCards';
import { DashboardRecentInvoices } from './widgets/DashboardRecentInvoices';
import { DashboardCompanyInfo } from './widgets/DashboardCompanyInfo';

export function DashboardContent() {
    const { user, stats, isLoading } = useDashboardStats();

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h2>
                <p className="text-slate-500">
                    Resumen general de facturación electrónica y estado DIAN.
                </p>
            </div>

            <DashboardStatsCards stats={stats} isLoading={isLoading} />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <DashboardRecentInvoices recentInvoices={stats.recentInvoices} isLoading={isLoading} />
                <DashboardCompanyInfo user={user} />
            </div>
        </div>
    );
}
