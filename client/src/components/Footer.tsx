import { FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-background py-12">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-2xl font-bold">Classic Fashion Show</div>
          
          <div className="flex gap-6">
            <a href="https://twitter.com" className="text-2xl hover:text-primary">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" className="text-2xl hover:text-primary">
              <FaInstagram />
            </a>
            <a href="mailto:contact@classicfashion.show" className="hover:text-primary">
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
