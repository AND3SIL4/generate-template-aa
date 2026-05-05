const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-slate-200 p-3 text-center flex w-full items-center justify-center">
      Developed by
      <a
        className="p-1 font-medium animate-pulse hover:text-green-800"
        href="https:github.com/and3sil4"
        target="blank"
      >
        @AND3SIL4
      </a>
      - {currentYear}
    </footer>
  );
};

export default Footer;
