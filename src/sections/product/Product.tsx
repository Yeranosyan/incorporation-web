import type { ProductContent } from "@/content/product";
import { Section } from "@/ui";
import type { SectionViewProps } from "../section";
import { ProductCycle } from "./ProductCycle";
import { ProductIntegration } from "./ProductIntegration";
import { ProductIntro } from "./ProductIntro";
import { ProductPortals } from "./ProductPortals";
import { ProductSafeguards } from "./ProductSafeguards";
import { ProductWorkflow } from "./ProductWorkflow";

export type ProductProps = SectionViewProps<ProductContent>;

export function Product({ id, content }: ProductProps) {
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
