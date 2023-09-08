import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

export default async function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}

