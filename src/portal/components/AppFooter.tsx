const linkColumns = [
  ["URMEI", "About Us"],
  ["Collaborate", "Top Brands"],
  ["Support", "Help Center", "Contact Us"],
  ["Legal", "Terms of Service", "Privacy Policy"],
];

const socials = [
  { name: "facebook", href: "https://www.facebook.com/", iconClass: "h-[13.333px] w-[7.333px]" },
  { name: "instagram", href: "https://www.instagram.com/", iconClass: "size-[14.663px]" },
  { name: "twitter", href: "https://x.com/", iconClass: "h-[12.672px] w-[14.663px]" },
];

/** Shared footer for every signed-in screen (Home, Help Center, Recent
 *  Activities, My Shop). */
export default function AppFooter() {
  return (
    <footer className="bg-[#2c2927] px-6 py-10 text-[#fdfdfd] lg:px-[120px]">
      {/* 1200 = the page's own 1440px content column minus its 120px side
          padding — keeps this content aligned with the page above it once the
          viewport passes 1440px, where the page's own max-width stops growing
          but this padded, uncapped `footer` otherwise would. */}
      <div className="mx-auto max-w-[1200px]">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {linkColumns.map(([title, ...links]) => (
            <div key={title}>
              <h3 className="track-section mb-3 text-body-md font-medium uppercase">{title}</h3>
              {links.map((link) => (
                <a
                  key={link}
                  href={link === "Help Center" ? "#/help-center" : link === "Top Brands" ? "#/brands" : "#"}
                  className="block text-body-md"
                >
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>
        <img src="/urmei/home/footer-wordmark.svg" alt="URMEI" className="my-16 w-full opacity-60" />
        <div className="flex items-center justify-between">
          <p className="text-body-md">© 2025 URMEI ®</p>
          <div className="flex gap-3">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open URMEI on ${social.name}`}
                className="flex size-12 cursor-pointer items-center justify-center rounded-full bg-[#f2efed] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portal-light"
              >
                <span className="flex size-4 items-center justify-center">
                  <img src={`/urmei/home/${social.name}.svg`} alt="" className={`block max-w-none ${social.iconClass}`} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
