import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Register | Studio Space',
    icons:{
        icon: '/icon.png'
    }
};

export default function RegisterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}