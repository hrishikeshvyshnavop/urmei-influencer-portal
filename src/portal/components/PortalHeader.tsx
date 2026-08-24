const logoLetters = [
  { src: "/urmei/logo-u.svg", alt: "U", className: "h-[16px] w-[14.059px]" },
  { src: "/urmei/logo-r.svg", alt: "R", className: "h-[15.999px] w-[17.795px]" },
  { src: "/urmei/logo-m.svg", alt: "M", className: "h-[15.999px] w-[29.573px]" },
  { src: "/urmei/logo-e.svg", alt: "E", className: "h-[16px] w-[17.907px]" },
  { src: "/urmei/logo-i.svg", alt: "I", className: "h-[15.993px] w-[14.018px]" },
];

export default function PortalHeader() {
  return (
    <header className="absolute inset-x-0 top-0 flex h-[96px] items-center justify-between px-[64px] py-6">
      <div className="flex h-full min-w-px flex-1 flex-col items-start gap-[10px] py-[15px]">
        <div className="flex w-full items-center gap-[3.569px]" aria-label="URMEI">
          {logoLetters.map((letter) => (
            <img
              key={letter.alt}
              src={letter.src}
              alt=""
              className={`block max-w-none ${letter.className}`}
            />
          ))}
        </div>
      </div>
      <div className="flex min-w-px flex-1 items-center justify-end gap-[10px]">
        <button
          type="button"
          className="flex h-[48px] cursor-pointer items-center gap-[6px] px-2"
        >
          <img src="/urmei/flag-en.svg" alt="" className="block size-[20px]" />
          <span className="text-body-md font-medium text-portal-text">EN</span>
        </button>
      </div>
    </header>
  );
}
