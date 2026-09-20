import { FOOTER } from "@/content/footer";
import { COMPANY, PRIMARY_ACTION, UI_TEXT } from "@/content/site";
import { Footer } from "@/layout/Footer";
import { Header } from "@/layout/Header";
import { NAV_ITEMS, SECTIONS } from "@/sections/registry";

export function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        {UI_TEXT.skipLink}
      </a>
      <Header brand={COMPANY.name} navItems={NAV_ITEMS} action={PRIMARY_ACTION} text={UI_TEXT} />
      <main id="main">
        {SECTIONS.map(({ id, Component, content }) => (
          <Component key={id} id={id} content={content} />
        ))}
      </main>
      <Footer company={COMPANY} footer={FOOTER} navItems={NAV_ITEMS} />
    </>
  );
}
