import { Link } from '@inertiajs/react';
import NavButton from './nav-button';
import { LogIn, UserPlus } from 'lucide-react';
import { Auth } from '@/types';

interface AuthActionsProps {
    auth: Auth;
}

export default function AuthActions({ auth }: AuthActionsProps) {
    if (auth.user) {
        return (
            <div className="flex items-center gap-3">
                <Link href={route('clients.index')}>
                    <NavButton variant="primary">
                        Clientes
                    </NavButton>
                </Link>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-3">
            <Link href={route('login')}>
                <NavButton variant="accent">
                    <LogIn className="mr-2 h-4 w-4 hidden md:block" />
                    Logar
                </NavButton>
            </Link>
            <Link href={route('register')}>
                <NavButton variant="accent">
                    <UserPlus className="mr-2 h-4 w-4 hidden md:block" />
                    Cadastro
                </NavButton>
            </Link>
        </div>
    );
}
