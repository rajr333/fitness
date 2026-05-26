export default function SectionLabel({ label }: { label: string }) {
  return (
    <p className="text-label" style={{ marginBottom: "1rem", position: "relative" }}>
      <span style={{ color: "var(--electric)", marginRight: "0.5rem" }}>◆</span>
      {label}
    </p>
  );
}
