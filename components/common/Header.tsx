"use client"
import React, { useState, useEffect } from 'react'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const LANDING_SECTION_HEIGHT = 100; // Height in pixels to consider as "landing section"

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Always show header when at the top of the page
      if (currentScrollY <= LANDING_SECTION_HEIGHT) {
        setIsVisible(true);
      } else {
        // Show header when scrolling up, hide when scrolling down
        if (currentScrollY < lastScrollY) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Only hide header if not navigating to home/landing
      if (targetId !== 'home') {
        setIsVisible(false);
      }
    }
  };

  return (
    <div 
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className='flex justify-center items-center p-4 w-full'>
        <div className='rounded-md bg-black/20 backdrop-blur-md border border-white/10'>
          <NavigationMenu>
            <NavigationMenuList className='flex gap-1 p-1'>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  href="#home" 
                  className="px-4 py-2 rounded-md transition-colors hover:bg-white/10"
                  onClick={(e) => handleNavigation(e, 'home')}
                >
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  href="#about" 
                  className="px-4 py-2 rounded-md transition-colors hover:bg-white/10"
                  onClick={(e) => handleNavigation(e, 'about')}
                >
                  About Me
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  href="#experience" 
                  className="px-4 py-2 rounded-md transition-colors hover:bg-white/10"
                  onClick={(e) => handleNavigation(e, 'experience')}
                >
                  Experience
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  href="#projects" 
                  className="px-4 py-2 rounded-md transition-colors hover:bg-white/10"
                  onClick={(e) => handleNavigation(e, 'projects')}
                >
                  Projects
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  href="#contact" 
                  className="px-4 py-2 rounded-md transition-colors hover:bg-white/10"
                  onClick={(e) => handleNavigation(e, 'contact')}
                >
                  Contact
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </div>
  )
}

export default Header
