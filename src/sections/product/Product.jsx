import { Section } from "@/ui";
import { ProductCycle } from "./ProductCycle";
import { ProductIntegration } from "./ProductIntegration";
import { ProductIntro } from "./ProductIntro";
import { ProductPortals } from "./ProductPortals";
import { ProductSafeguards } from "./ProductSafeguards";
import { ProductWorkflow } from "./ProductWorkflow";

export function Product({ id, content }) {
  const headingId = `${id}-title`;

  return (
    <Section id={id} tone="dark" labelledBy={headingId}>
      <div aria-hidden="true" className="product-accent-rule" />
      <ProductIntro headingId={headingId} content={content} />
      <ProductCycle cycle={content.cycle} highlights={content.highlights} comparison={content.comparison} />
      <ProductPortals intro={content.portalsIntro} portals={content.portals} />
      <ProductWorkflow intro={content.workflowIntro} workflow={content.workflow} />
      <ProductIntegration integration={content.integration} />
      <ProductSafeguards safeguards={content.safeguards} />
    </Section>
  );
}
