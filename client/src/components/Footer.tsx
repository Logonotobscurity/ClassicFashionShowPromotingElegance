import { FaInstagram } from "react-icons/fa";
import { SiThreads } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-background py-12">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <img 
              src="/assets/logo.webp" 
              alt="Classic Fashion Show" 
              className="h-12 w-auto object-contain"
              style={{ filter: 'brightness(1.2)' }}
            />
          </div>
          
          <div className="flex gap-6">
            <a href="https://www.instagram.com/classics__fashionova/profilecard" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="text-2xl hover:text-primary">
              <FaInstagram />
            </a>
            <a href="https://www.threads.net/@boi_classics?igshid=ZGUzMzM3NWJiOQ==" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="text-2xl hover:text-primary">
              <SiThreads />
            </a>
            <a href="mailto:info@classicfashion.africa" className="hover:text-primary">
              Email Us
            </a>
          </div>
          
          <div className="text-sm text-muted-foreground">
            © 2024 Classic Fashion Show. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
