// components/Navbar.tsx

import Link from 'next/link';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">PronunFix</h1>
                <div className="space-x-4">
                    <Link href="/" className="hover:text-green-400">
                        Home
                    </Link>
                    <Link href="/resources" className="hover:text-green-400">
                        Resources
                    </Link>
                    <Link href="/login" className="hover:text-green-400">
                        Login
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
