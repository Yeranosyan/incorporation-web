import { Brand, Container } from "@/ui";
import { FooterColumn } from "./FooterColumn";

export function Footer({ company, footer, navItems }) {
  const sectionLinks = navItems.map(({ id, label }) => ({ label, href: `#${id}` }));

  return (
    <footer data-tone="dark" className="border-t border-(--line) py-16">
      <Container>
        <div className="split-layout">
          <div className="lg:col-span-5">
            <Brand name={company.shortName} />
            <p className="muted-copy-small mt-6 max-w-sm">{footer.statement}</p>
          </div>
          <div className="site-footer-columns lg:col-span-7">
            <FooterColumn title={footer.sectionsLabel} links={sectionLinks} />
            {footer.columns.map((column) => (
              <FooterColumn key={column.title} {...column} />
            ))}
          </div>
        </div>

        <div className="site-footer-bar mt-16">
          <p>{company.copyright}</p>
          <p className="type-label">
            {company.location} · {company.coordinates}
          </p>
        </div>
      </Container>
    </footer>
  );
}
