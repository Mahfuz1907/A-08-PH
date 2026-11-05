import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Login | Studio Space',
    icons:{
        icon: '/icon.png'
    }
};

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}