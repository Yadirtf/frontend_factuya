'use client';

import { useParams } from 'next/navigation';
import { CompanyDetailContent } from '@/components/companies/CompanyDetailContent';

export default function CompanyDetailPage() {
    const params = useParams();
    const companyId = params.id as string;

    return <CompanyDetailContent companyId={companyId} />;
}
