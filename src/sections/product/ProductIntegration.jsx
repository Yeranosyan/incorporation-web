import { SectionHeader, SpecList } from "@/ui";
import { DataTypeGrid } from "./DataTypeGrid";
import { SyncDiagram } from "./SyncDiagram";
import { WriteBackCard } from "./WriteBackCard";

export function ProductIntegration({ integration }) {
  const { label, title, guarantee, source, target, specs, inboundLabel, syncedLabel, inbound, outboundLabel, outbound } =
    integration;

  return (
    <div className="mt-28">
      <div className="split-layout lg:items-end">
        <SectionHeader level="h3" eyebrow={label} title={title} lede={guarantee} className="lg:col-span-6" />
        <SpecList specs={specs} size="sm" className="integration-readouts sm:grid-cols-3 lg:col-span-6" />
      </div>

      <SyncDiagram integration={integration} className="mt-16 sm:mt-20" />

      <div className="split-layout mt-16 lg:items-start">
        <DataTypeGrid label={inboundLabel} syncedLabel={syncedLabel} items={inbound} className="lg:col-span-7" />
        <WriteBackCard
          label={outboundLabel}
          outbound={outbound}
          from={target.name}
          to={source.name}
          className="lg:col-span-5"
        />
      </div>
    </div>
  );
}
