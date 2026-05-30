"use client";
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-scroll';  // Import Link from react-scroll

const logo = "/equiskill-logo.png"; // Use the actual Equiskill logo
import { navItems } from '@/constants';
import GetStarted from './GetStarted';

const Navbar = () => {
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

    const toggleNavbar = () => {
        setMobileDrawerOpen(!mobileDrawerOpen);
    }

    const closeMobileMenu = () => {
        setMobileDrawerOpen(false);
    }

    return (
        <nav className="sticky top-0 z-50 py-2 backdrop-blur-lg border-b border-neutral-700/80">
            <div className="container px-4 mx-auto relative text-sm">
                <div className="flex justify-between items-center">
                    <div className="flex items-center flex-shrink-0">
                        <img className="h-12 w-50 mr-2" src={logo} alt="logo" />
                        <span className="text-xl tracking-tight"></span>
                    </div>
                    <ul className="hidden lg:flex ml-30 space-x-12">
                        {navItems.map((item, index) => (
                            <li key={index}>
                                <Link
                                    to={item.href.replace('#', '')}
                                    smooth={true}
                                    duration={500}
                                    offset={-70}
                                    className="cursor-pointer"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="hidden lg:flex justify-center space-x-12 items-center">
                        <GetStarted />
                    </div>
                    <div className="lg:hidden md:flex flex-col justify-end">
                        <button onClick={toggleNavbar}>
                            {mobileDrawerOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
                {mobileDrawerOpen && (
                    <div className="fixed right-0 z-20 bg-white w-full p-12 flex flex-col justify-center items-center lg:hidden">
                        <ul>
                            {navItems.map((item, index) => (
                                <li key={index} className="py-4">
                                    <Link
                                        to={item.href.replace('#', '')}
                                        smooth={true}
                                        duration={500}
                                        offset={-70}
                                        className="cursor-pointer"
                                        onClick={closeMobileMenu}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="flex space-x-6">
                            <a href="#" className="py-2 px-3 rounded-md bg-gradient-to-r from-blue-300 to-blue-500">
                                Get Started
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
