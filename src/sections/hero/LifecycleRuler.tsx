import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import type { HeroContent } from "@/content/hero";
import { useSpringDriver } from "@/hooks/useSpringDriver";
import { padNumber } from "@/lib/format";
import { clamp, createVelocityTracker, nearestIndex, projectMomentum, resistBounds } from "@/lib/gesture";
import { resolveKeyIndex } from "@/lib/keyboard";
import { prefersReducedMotion } from "@/lib/motion";
import { SPRINGS } from "@/lib/spring";
import { Crossfade } from "@/ui";

export type Lifecycle = HeroContent["lifecycle"];
export type LifecycleStage = Lifecycle["stages"][number];
export type LifecycleRulerProps = { content: Lifecycle };

type Gesture = { startX: number; origin: number; moved: boolean };

const STAGE_GAP = 160;
const DRAG_THRESHOLD = 6;
const TICK_OVERSCAN = 640;
const FLICK_VELOCITY = 80;

const stageKey = (stage: LifecycleStage) => stage.id;

export function LifecycleRuler({ content }: LifecycleRulerProps) {
  const { label, hint, stages } = content;
  const stops = useMemo(() => stages.map((_, index) => index * STAGE_GAP), [stages]);
  const lastStop = stops[stops.length - 1];

  const trackRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const gestureRef = useRef<Gesture | null>(null);
  const activeRef = useRef(0);
  const [tracker] = useState(createVelocityTracker);
  const [active, setActive] = useState(0);

  const select = useCallback((index: number) => {
    if (index === activeRef.current) return;
    activeRef.current = index;
    setActive(index);
  }, []);

  const renderFrame = useCallback(
    (value: number) => {
      if (trackRef.current) trackRef.current.style.transform = `translate3d(${-value}px, 0, 0)`;
      labelRefs.current.forEach((node, index) => {
        const focus = clamp(1 - Math.abs(stops[index] - value) / STAGE_GAP, 0, 1);
        node?.style.setProperty("--focus", focus.toFixed(3));
      });
      if (gestureRef.current?.moved) select(nearestIndex(stops, value));
    },
    [stops, select],
  );

  const driver = useSpringDriver(renderFrame);

  useLayoutEffect(() => {
    renderFrame(driver.read());
  }, [renderFrame, driver]);

  const settleTo = (index: number, velocity = 0) => {
    select(index);
    if (prefersReducedMotion()) {
      driver.set(stops[index]);
      return;
    }
    const config = Math.abs(velocity) > FLICK_VELOCITY ? SPRINGS.momentum : SPRINGS.settle;
    driver.animateTo(stops[index], config, velocity);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    driver.stop();
    event.currentTarget.setPointerCapture(event.pointerId);
    gestureRef.current = { startX: event.clientX, origin: driver.read(), moved: false };
    tracker.reset();
    tracker.add(driver.read(), event.timeStamp);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const gesture = gestureRef.current;
    if (!gesture) return;
    const offset = event.clientX - gesture.startX;
    if (!gesture.moved && Math.abs(offset) < DRAG_THRESHOLD) return;
    gesture.moved = true;
    const value = resistBounds(gesture.origin - offset, 0, lastStop, event.currentTarget.clientWidth);
    driver.set(value);
    tracker.add(value, event.timeStamp);
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const gesture = gestureRef.current;
    gestureRef.current = null;
    if (!gesture) return;

    if (!gesture.moved) {
      const bounds = event.currentTarget.getBoundingClientRect();
      const tapped = driver.read() + event.clientX - (bounds.left + bounds.width / 2);
      settleTo(nearestIndex(stops, tapped));
      return;
    }

    const velocity = tracker.velocity();
    settleTo(nearestIndex(stops, driver.read() + projectMomentum(velocity)), velocity);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const target = resolveKeyIndex(event.key, activeRef.current, stages.length);
    if (target === null) return;
    event.preventDefault();
    settleTo(target);
  };

  const stage = stages[active];

  return (
    <div className="glass-blur glass-card p-6 sm:p-8">
      <div className="spread-row-top">
        <p className="type-label text-(--fg-muted)">{label}</p>
        <p className="ruler-hint">{hint}</p>
      </div>

      <div className="ruler-stage-grid mt-6">
        <Crossfade
          items={stages}
          active={active}
          axis="y"
          getKey={stageKey}
          aria-hidden="true"
          className="type-numeral text-accent-text [--crossfade-distance:0.45em]"
        >
          {(_, index) => padNumber(index + 1, 2)}
        </Crossfade>
        <Crossfade items={stages} active={active} getKey={stageKey}>
          {({ name, summary }) => (
            <>
              <p className="type-title">{name}</p>
              <p className="muted-body max-w-2xl mt-2">{summary}</p>
            </>
          )}
        </Crossfade>
      </div>

      <p className="sr-only" aria-live="polite">
        {`${stage.name}. ${stage.summary}`}
      </p>

      <div
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-valuemin={1}
        aria-valuemax={stages.length}
        aria-valuenow={active + 1}
        aria-valuetext={stage.name}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onKeyDown={handleKeyDown}
        className="ruler-viewport mt-8"
      >
        <div aria-hidden="true" className="absolute inset-y-0 left-1/2">
          <div ref={trackRef} className="ruler-track">
            <div className="ruler-tick-strip" style={{ left: -TICK_OVERSCAN, width: lastStop + TICK_OVERSCAN * 2 }} />
            {stages.map(({ id, name }, index) => (
              <span
                key={id}
                ref={(node) => {
                  labelRefs.current[index] = node;
                }}
                className="ruler-label ruler-label-layout"
                style={{ left: stops[index] }}
              >
                {name}
              </span>
            ))}
          </div>
          <span className="ruler-needle" />
        </div>
      </div>
    </div>
  );
}
