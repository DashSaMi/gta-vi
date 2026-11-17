export default function Loading() {
  return (
    <div
      role="progressbar"
      aria-label="Loading page"
      className="min-h-[60vh] w-full bg-[#06050A]"
    >
      <div className="fixed top-16 inset-x-0 h-[3px] z-50 bg-gradient-to-r from-[#FB7185] via-[#E879F9] to-[#9333EA] shadow-[0_0_12px_rgba(192,132,252,0.85)] animate-pulse pointer-events-none" />
    </div>
  );
}
