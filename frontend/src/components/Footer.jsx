const Footer = () => {
  return (
    <footer className="border-t border-border mt-12 py-8 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} Rahul Developer. All rights reserved.</p>
        <p className="text-sm mt-2">Building beautiful digital experiences.</p>
      </div>
    </footer>
  );
};

export default Footer;
