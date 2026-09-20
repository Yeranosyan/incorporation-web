import { linkTargetProps } from "@/lib/links";

export type FooterLink = { label: string; href: string; external?: boolean };
export type FooterColumnProps = { title: string; links: FooterLink[] };

export function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <p className="type-label text-(--fg-subtle)">{title}</p>
      <ul className="mt-5 space-y-3">
        {links.map(({ label, href, external }) => (
          <li key={label}>
            <a href={href} {...linkTargetProps({ external })} className="site-footer-link">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
