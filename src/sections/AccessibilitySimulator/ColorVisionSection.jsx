import { useId, useRef, useState } from "react";
import styles from "./SimulatorStyles.module.css";
import { useTabListKeyboard } from "../../common/useTabListKeyboard";
import {
  COLOR_PALETTE,
  COLOR_VISION_MODES,
  CONTRAST_EXAMPLES,
  STATUS_DEMO,
  getContrastRating,
  getContrastRatio,
} from "./colorVisionData";

function ColorVisionFilters() {
  return (
    <svg aria-hidden="true" focusable="false" className={styles.colorFiltersSvg}>
      <defs>
        <filter id="color-filter-protanopia">
          <feColorMatrix
            type="matrix"
            values="0.567 0.433 0 0 0
                    0.558 0.442 0 0 0
                    0 0.242 0.758 0 0
                    0 0 0 1 0"
          />
        </filter>
        <filter id="color-filter-deuteranopia">
          <feColorMatrix
            type="matrix"
            values="0.625 0.375 0 0 0
                    0.7 0.3 0 0 0
                    0 0.3 0.7 0 0
                    0 0 0 1 0"
          />
        </filter>
        <filter id="color-filter-tritanopia">
          <feColorMatrix
            type="matrix"
            values="0.95 0.05 0 0 0
                    0 0.433 0.567 0 0
                    0 0.475 0.525 0 0
                    0 0 0 1 0"
          />
        </filter>
      </defs>
    </svg>
  );
}

function StatusRow({ demo }) {
  return (
    <div className={styles.statusDemoBlock}>
      <div className={styles.statusDemoHeader}>
        <span
          className={
            demo.colorOnly ? styles.statusDemoTagBad : styles.statusDemoTagGood
          }
        >
          {demo.tag}
        </span>
        <span className={styles.statusDemoTitle}>{demo.title}</span>
      </div>
      <div className={styles.statusDemoRow}>
        {demo.items.map((item) => {
          const toneClass =
            item.tone === "success"
              ? styles.statusPillSuccess
              : item.tone === "error"
                ? styles.statusPillError
                : styles.statusPillWarning;

          return (
            <span key={item.label} className={`${styles.statusPill} ${toneClass}`}>
              {!demo.colorOnly && (
                <span className={styles.statusPillIcon} aria-hidden="true">
                  {item.tone === "success"
                    ? "✓"
                    : item.tone === "error"
                      ? "✕"
                      : "!"}
                </span>
              )}
              {demo.colorOnly ? (
                <span
                  className={styles.statusPillDotOnly}
                  aria-hidden="true"
                />
              ) : (
                item.label
              )}
              {demo.colorOnly && (
                <span className="sr-only">{item.label}</span>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function CompareScene({ filterStyle, label, variant }) {
  return (
    <div
      className={
        variant === "simulated"
          ? `${styles.compareScene} ${styles.compareSceneSimulated}`
          : styles.compareScene
      }
      style={filterStyle}
    >
      <p className={styles.compareSceneLabel}>{label}</p>
      <StatusRow demo={STATUS_DEMO.bad} />
      <StatusRow demo={STATUS_DEMO.good} />
    </div>
  );
}

function PaletteStrip({ filterStyle, label }) {
  return (
    <div className={styles.paletteStripWrap}>
      <p className={styles.paletteStripLabel}>{label}</p>
      <ul className={styles.paletteStrip} style={filterStyle}>
        {COLOR_PALETTE.map((color) => (
          <li key={color.name} className={styles.paletteSwatch}>
            <span
              className={styles.paletteColor}
              style={{ backgroundColor: color.hex }}
              aria-hidden="true"
            />
            <span className={styles.paletteName}>{color.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ColorVisionSection({ isPage = false }) {
  const sliderId = useId();
  const helpId = useId();
  const compareSummaryId = useId();
  const stageRef = useRef(null);
  const trackRef = useRef(null);
  const handleTrackRef = useRef(null);
  const isDraggingRef = useRef(false);
  const [visionMode, setVisionMode] = useState(COLOR_VISION_MODES[0].id);
  const [sliderValue, setSliderValue] = useState(50);

  const activeMode =
    COLOR_VISION_MODES.find((mode) => mode.id === visionMode) ??
    COLOR_VISION_MODES[0];
  const simulatedFilter = { filter: `url(#${activeMode.filterId})` };
  const visionModeIds = COLOR_VISION_MODES.map((mode) => mode.id);

  const { tabListProps, getTabProps } = useTabListKeyboard(
    visionModeIds,
    visionMode,
    setVisionMode
  );

  const updateSliderFromClientX = (clientX) => {
    const handleTrack = handleTrackRef.current;
    if (!handleTrack) {
      return;
    }

    const rect = handleTrack.getBoundingClientRect();
    const position = ((clientX - rect.left) / rect.width) * 100;
    const nextValue = Math.max(0, Math.min(100, Math.round(position)));
    setSliderValue(nextValue);
  };

  function handleHandleTrackPointerDown(event) {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    isDraggingRef.current = true;
    handleTrackRef.current?.setPointerCapture(event.pointerId);
    updateSliderFromClientX(event.clientX);
  }

  function handleHandleTrackPointerMove(event) {
    if (!isDraggingRef.current) {
      return;
    }

    updateSliderFromClientX(event.clientX);
  }

  function stopDragging(event) {
    if (!isDraggingRef.current) {
      return;
    }

    isDraggingRef.current = false;
    if (handleTrackRef.current?.hasPointerCapture(event.pointerId)) {
      handleTrackRef.current.releasePointerCapture(event.pointerId);
    }
  }

  function handleSliderKeyDown(event) {
    if (event.key === "Home") {
      event.preventDefault();
      setSliderValue(0);
    }

    if (event.key === "End") {
      event.preventDefault();
      setSliderValue(100);
    }
  }

  return (
    <section
      className={
        isPage
          ? `${styles.colorVisionSection} ${styles.colorVisionSectionPage}`
          : styles.colorVisionSection
      }
      id="simulator-color-vision"
      aria-labelledby="color-vision-heading"
    >
      <ColorVisionFilters />

      <header className={styles.colorVisionHeader}>
        <p className={styles.eyebrow}>Color & contrast</p>
        {isPage ? (
          <h1 id="color-vision-heading" className={styles.colorVisionTitle}>
            Normal vision vs color blind vision
          </h1>
        ) : (
          <h2 id="color-vision-heading" className={styles.colorVisionTitle}>
            Normal vision vs color blind vision
          </h2>
        )}
        <p className={styles.colorVisionLead}>
          Pick a color vision type with the tabs (arrow keys work). Drag the
          circle on the track or Tab to the keyboard slider below.
        </p>
      </header>

      <div {...tabListProps} className={styles.colorVisionTabs} aria-label="Color vision type">
        {COLOR_VISION_MODES.map((mode, index) => {
          const selected = visionMode === mode.id;
          const tabProps = getTabProps(mode.id, index);

          return (
            <button
              key={mode.id}
              {...tabProps}
              id={`color-vision-tab-${mode.id}`}
              aria-controls="color-vision-panel"
              className={
                selected ? styles.colorVisionTabActive : styles.colorVisionTab
              }
            >
              <span className={styles.colorVisionTabLabel}>{mode.label}</span>
              <span className={styles.colorVisionTabHint}>{mode.shortLabel}</span>
            </button>
          );
        })}
      </div>

      <div
        id="color-vision-panel"
        role="tabpanel"
        aria-labelledby={`color-vision-tab-${visionMode}`}
        className={styles.colorVisionPanel}
      >
      <div className={styles.paletteCompare}>
        <PaletteStrip label="Normal vision — colors" />
        <PaletteStrip
          label={`${activeMode.label} — how colors can look`}
          filterStyle={simulatedFilter}
        />
      </div>

      <div className={styles.sliderCompareWrap}>
        <div className={styles.sliderCompareLabels}>
          <span>Normal</span>
          <span>{activeMode.label}</span>
        </div>

        <p id={compareSummaryId} className={styles.compareStageSummary}>
          Comparison at {sliderValue}%: normal vision on the left,{" "}
          {activeMode.label} on the right. The preview shows color-only status
          pills (hard to tell apart) next to status pills with icons and text
          labels (easy to tell apart).
        </p>

        <div ref={stageRef} className={styles.sliderCompareStage}>          <div ref={trackRef} className={styles.sliderCompareTrack}>
            <CompareScene label="Normal vision" variant="normal" />
            <div
              className={styles.sliderCompareOverlay}
              style={{
                clipPath: `inset(0 0 0 ${sliderValue}%)`,
                ...simulatedFilter,
              }}
            >
              <CompareScene
                label={activeMode.label}
                variant="simulated"
                filterStyle={simulatedFilter}
              />
            </div>
            <div
              className={styles.sliderCompareDivider}
              style={{ left: `${sliderValue}%` }}
            />
          </div>

          <div className={styles.sliderCompareHandleTrack} aria-hidden="true">            <div
              ref={handleTrackRef}
              className={styles.sliderCompareHandleInner}
              onPointerDown={handleHandleTrackPointerDown}
              onPointerMove={handleHandleTrackPointerMove}
              onPointerUp={stopDragging}
              onPointerCancel={stopDragging}
            >
              <div className={styles.sliderCompareHandleRail} aria-hidden="true" />
              <div
                className={styles.sliderCompareHandle}
                style={{ left: `${sliderValue}%` }}
              />
            </div>
          </div>
        </div>

        <div className={styles.sliderCompareControl}>
          <label className={styles.sliderCompareControlText} htmlFor={sliderId}>
            Keyboard comparison slider
          </label>
          <input
            id={sliderId}
            type="range"
            min={0}
            max={100}
            step={1}
            value={sliderValue}
            onChange={(event) => setSliderValue(Number(event.target.value))}
            onKeyDown={handleSliderKeyDown}
            className={styles.sliderCompareInput}
            aria-label={`Compare normal vision and ${activeMode.label}. Use left and right arrow keys.`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={sliderValue}
            aria-valuetext={`${sliderValue}% ${activeMode.label} view visible`}
            aria-describedby={`${helpId} ${compareSummaryId}`}          />
          <p id={helpId} className={styles.sliderCompareHelp}>
            Tab to this slider, then use Left/Right arrows (or Home/End). Mouse
            users can drag the circle on the track under the preview.
          </p>
        </div>
        <p className={styles.colorSimulationNote}>
          Educational simulation only. Real color vision varies by person.
        </p>
      </div>

      <div className={styles.contrastBlock}>
        <h3 className={styles.contrastBlockTitle}>Contrast (WCAG 1.4.3)</h3>
        <p className={styles.contrastBlockLead}>
          Text needs at least 4.5:1 contrast for AA — readable even when colors
          look similar.
        </p>
        <div className={styles.contrastGrid}>
          {CONTRAST_EXAMPLES.map((example) => {
            const ratio = getContrastRatio(example.foreground, example.background);
            const rating = getContrastRating(ratio);

            return (
              <div
                key={example.id}
                className={
                  rating.pass ? styles.contrastCardPass : styles.contrastCardFail
                }
              >
                <p
                  className={styles.contrastSampleText}
                  style={{
                    color: example.foreground,
                    backgroundColor: example.background,
                  }}
                >
                  {example.sample}
                </p>
                <div className={styles.contrastCardMeta}>
                  <strong>{example.label}</strong>
                  <span>{ratio.toFixed(1)}:1</span>
                  <span
                    className={
                      rating.pass ? styles.contrastPass : styles.contrastFail
                    }
                  >
                    {rating.pass ? `Passes ${rating.level}` : "Fails AA"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.colorTakeaway}>
        <p>
          <strong>Takeaway:</strong> Never use color alone for important
          messages. Add words, icons, and strong contrast — that helps everyone.
        </p>
      </div>
      </div>
    </section>
  );
}
