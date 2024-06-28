// import Login from './login/login';
import Login from '@/app/login/login-component';
import NavbarMobile from './navbar-mobile';
import Link from 'next/link';

function Header() {
    return (
        <div className="px-6 py-3 flex items-center justify-between border-b bg-primary/80">
            <div className='flex items-center'>
                <NavbarMobile />
                <Link href="/">
                    <h1 className="text-xl font-bold hover:text-white">AABB tênis</h1>
                </Link>
            </div>
            <Login />
        </div>
    )
}

export default Header;