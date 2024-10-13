// components/Navbar.tsx

import Link from 'next/link';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-white shadow-md text-black p-4">
            <div className="container mx-auto flex justify-between items-center">
                <img src="/Logo.png" alt="PronunFix" className="w-6 h-8" />
                <h1 className="text-xl font-bold">PronunFix</h1>
                <div className="space-x-4">
                    <Link href="/login" className="hover:text-green-400">
                        Login
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
