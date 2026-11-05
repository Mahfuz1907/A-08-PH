import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dashboard | Studio Space',
    icons:{
        icon: '/icon.png'
    }
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}