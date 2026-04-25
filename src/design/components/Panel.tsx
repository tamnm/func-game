import type { HTMLAttributes, ReactNode } from "react";

type PanelProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  title?: string;
  eyebrow?: string;
};

export function Panel({
  children,
  className = "",
  eyebrow,
  title,
  ...props
}: PanelProps) {
  return (
    <section className={`panel ${className}`} {...props}>
      {title ? (
        <div className="section-heading">
          <div>
            {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
            <h2>{title}</h2>
          </div>
        </div>
      ) : null}
      {children}
    </section>
  );
}
