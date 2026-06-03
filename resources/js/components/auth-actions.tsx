import { Link } from '@inertiajs/react';
import NavButton from './nav-button';
import { Cog, LogIn, UserPlus } from 'lucide-react';
import { Auth } from '@/types';

interface AuthActionsProps {
    auth: Auth;
}

export default function AuthActions({ auth }: AuthActionsProps) {
    if (auth.user) {
        return (
            <div className="flex items-center gap-3">
                <Link href={route('properties.index')}>
                    <NavButton variant="primary">
                        <span className="hidden md:block">Gerenciar</span>
                        <span className="block md:hidden"><Cog className="h-8 w-8" /></span>
                    </NavButton>
                </Link>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-3">
            <Link href={route('public.properties')}>
                <img src="/logo_build.png" alt="Logo" className="h-10 w-auto mr-3 relative z-10 drop-shadow-md" />
            </Link>
            {/* <Link href={route('register')}>
                <NavButton variant="primary">
                    <UserPlus className="mr-2 h-4 w-4 hidden md:block" />
                    Cadastro
                </NavButton>
            </Link> */}
        </div>
    );
}
