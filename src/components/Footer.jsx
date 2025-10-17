import { FaGithub, FaXTwitter } from "react-icons/fa6"

function Footer() {
  return (
    <footer className="mt-16 p-4 text-center text-sm md:text-base text-gray-600 bg-white">
      <p className="font-medium text-xs">
        © {new Date().getFullYear()} Smart Converter
      </p>
        {/* Social Links */}
      <div className="flex justify-center gap-4 text-1xl">
        <a
          href="https://github.com/Aola-j"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 hover:text-black transition"
          title="GitHub"
        >
          <FaGithub />
        </a>
        <a
          href="https://x.com/jodial_d"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 hover:text-black transition"
          title="X (Twitter)"
        >
          <FaXTwitter />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
