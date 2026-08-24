/** Uppercase section heading with the design's 1.6px tracking. */
export default function SectionTitle({ children }: { children: string }) {
  return (
    <h2 className="track-section w-full text-body-md font-medium uppercase text-portal-text">
      {children}
    </h2>
  );
}
