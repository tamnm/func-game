type StatusBannerTone = "info" | "success" | "warning" | "danger";

type StatusBannerProps = {
  children: string;
  tone?: StatusBannerTone;
};

export function StatusBanner({ children, tone = "info" }: StatusBannerProps) {
  return <p className={`status-banner status-${tone}`}>{children}</p>;
}
