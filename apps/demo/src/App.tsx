import { useState } from "react";
import {
  GlassButton,
  CapsuleBubbleButton,
  SphereMorphButton,
  GlassButtonFallback,
} from "glass-buttons";

export default function App() {
  const [page, setPage] = useState<"showcase" | "playground" | "performance">(
    "showcase"
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 50%, #0a1a2e 100%)",
        color: "#fff",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Nav */}
      <nav
        style={{
          display: "flex",
          gap: 16,
          padding: "20px 40px",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <button
          onClick={() => setPage("showcase")}
          style={{
            background: page === "showcase" ? "rgba(255,255,255,0.15)" : "transparent",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 8,
            color: "#fff",
            padding: "8px 20px",
            cursor: "pointer",
            fontSize: 14,
          }}
        >
          Showcase
        </button>
        <button
          onClick={() => setPage("playground")}
          style={{
            background: page === "playground" ? "rgba(255,255,255,0.15)" : "transparent",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 8,
            color: "#fff",
            padding: "8px 20px",
            cursor: "pointer",
            fontSize: 14,
          }}
        >
          Playground
        </button>
        <button
          onClick={() => setPage("performance")}
          style={{
            background: page === "performance" ? "rgba(255,255,255,0.15)" : "transparent",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 8,
            color: "#fff",
            padding: "8px 20px",
            cursor: "pointer",
            fontSize: 14,
          }}
        >
          Performance
        </button>
      </nav>

      <main style={{ padding: "40px" }}>
        {page === "showcase" && <ShowcasePage />}
        {page === "playground" && <PlaygroundPage />}
        {page === "performance" && <PerformancePage />}
      </main>
    </div>
  );
}

function ShowcasePage() {
  return (
    <div>
      <h1
        style={{
          fontSize: 48,
          fontWeight: 700,
          marginBottom: 8,
          background: "linear-gradient(135deg, #ff80c0, #80c0ff, #c080ff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Glass Bubble Buttons
      </h1>
      <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: 48, fontSize: 18 }}>
        Premium WebGL buttons with iridescent glass effects
      </p>

      {/* Unified GlassButton */}
      <Section title="GlassButton (Unified API)">
        <div style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap" }}>
          <GlassButton variant="capsule" onClick={() => console.log("capsule clicked")}>
            Get Started
          </GlassButton>
          <GlassButton variant="sphere" onClick={() => console.log("sphere clicked")}>
            Launch
          </GlassButton>
        </div>
      </Section>

      {/* Capsule Variants */}
      <Section title="Capsule Bubble Button">
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center" }}>
          <div>
            <Label>Rainbow (default)</Label>
            <CapsuleBubbleButton colorScheme="rainbow" onClick={() => console.log("rainbow")}>
              Continue
            </CapsuleBubbleButton>
          </div>
          <div>
            <Label>Pink</Label>
            <CapsuleBubbleButton colorScheme="pink" onClick={() => console.log("pink")}>
              Subscribe
            </CapsuleBubbleButton>
          </div>
          <div>
            <Label>Cyan</Label>
            <CapsuleBubbleButton colorScheme="cyan" onClick={() => console.log("cyan")}>
              Explore
            </CapsuleBubbleButton>
          </div>
          <div>
            <Label>Dissolve on Click</Label>
            <CapsuleBubbleButton dissolveOnClick onClick={() => console.log("dissolve")}>
              Dissolve Me
            </CapsuleBubbleButton>
          </div>
          <div>
            <Label>Disabled</Label>
            <CapsuleBubbleButton disabled>
              Unavailable
            </CapsuleBubbleButton>
          </div>
        </div>
      </Section>

      {/* Sphere Variants */}
      <Section title="Sphere Morph Button">
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center" }}>
          <div>
            <Label>Pink (default)</Label>
            <SphereMorphButton colorScheme="pink" onClick={() => console.log("pink sphere")}>
              Launch
            </SphereMorphButton>
          </div>
          <div>
            <Label>Rainbow</Label>
            <SphereMorphButton colorScheme="rainbow" onClick={() => console.log("rainbow sphere")}>
              Create
            </SphereMorphButton>
          </div>
          <div>
            <Label>Shatter on Click</Label>
            <SphereMorphButton shatterOnClick onClick={() => console.log("shatter")}>
              Shatter
            </SphereMorphButton>
          </div>
          <div>
            <Label>Disabled</Label>
            <SphereMorphButton disabled>
              Locked
            </SphereMorphButton>
          </div>
        </div>
      </Section>

      {/* CSS Fallback */}
      <Section title="CSS Fallback (No WebGL)">
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center" }}>
          <GlassButtonFallback variant="capsule" onClick={() => console.log("fallback capsule")}>
            CSS Capsule
          </GlassButtonFallback>
          <GlassButtonFallback variant="sphere" colorScheme="pink" onClick={() => console.log("fallback sphere")}>
            CSS Sphere
          </GlassButtonFallback>
          <GlassButtonFallback variant="capsule" disabled>
            Disabled
          </GlassButtonFallback>
        </div>
      </Section>
    </div>
  );
}

function PlaygroundPage() {
  const [variant, setVariant] = useState<"capsule" | "sphere">("capsule");
  const [colorScheme, setColorScheme] = useState<"rainbow" | "pink" | "cyan">("rainbow");
  const [disabled, setDisabled] = useState(false);
  const [effectOnClick, setEffectOnClick] = useState(false);
  const [width, setWidth] = useState(220);
  const [height, setHeight] = useState(70);

  return (
    <div>
      <h2 style={{ fontSize: 32, marginBottom: 32 }}>Interactive Playground</h2>

      <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
        {/* Preview */}
        <div
          style={{
            flex: 1,
            minWidth: 300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 300,
            background: "rgba(255,255,255,0.03)",
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <GlassButton
            variant={variant}
            colorScheme={colorScheme}
            disabled={disabled}
            effectOnClick={effectOnClick}
            width={width}
            height={variant === "sphere" ? width : height}
            onClick={() => console.log("playground click")}
          >
            {variant === "capsule" ? "Get Started" : "Launch"}
          </GlassButton>
        </div>

        {/* Controls */}
        <div style={{ flex: 1, minWidth: 300 }}>
          <ControlGroup label="Variant">
            <select
              value={variant}
              onChange={(e) => {
                setVariant(e.target.value as any);
                if (e.target.value === "sphere") {
                  setWidth(140);
                  setHeight(140);
                } else {
                  setWidth(220);
                  setHeight(70);
                }
              }}
              style={selectStyle}
            >
              <option value="capsule">Capsule</option>
              <option value="sphere">Sphere</option>
            </select>
          </ControlGroup>

          <ControlGroup label="Color Scheme">
            <select
              value={colorScheme}
              onChange={(e) => setColorScheme(e.target.value as any)}
              style={selectStyle}
            >
              <option value="rainbow">Rainbow</option>
              <option value="pink">Pink</option>
              <option value="cyan">Cyan</option>
            </select>
          </ControlGroup>

          <ControlGroup label={`Width: ${width}px`}>
            <input
              type="range"
              min={80}
              max={400}
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              style={{ width: "100%" }}
            />
          </ControlGroup>

          {variant === "capsule" && (
            <ControlGroup label={`Height: ${height}px`}>
              <input
                type="range"
                min={40}
                max={200}
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                style={{ width: "100%" }}
              />
            </ControlGroup>
          )}

          <ControlGroup label="Options">
            <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={disabled}
                onChange={(e) => setDisabled(e.target.checked)}
              />
              Disabled
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", marginTop: 8 }}>
              <input
                type="checkbox"
                checked={effectOnClick}
                onChange={(e) => setEffectOnClick(e.target.checked)}
              />
              Effect on Click ({variant === "capsule" ? "Dissolve" : "Shatter"})
            </label>
          </ControlGroup>
        </div>
      </div>
    </div>
  );
}

function PerformancePage() {
  const counts = [1, 5, 10];
  const [activeCount, setActiveCount] = useState(1);

  return (
    <div>
      <h2 style={{ fontSize: 32, marginBottom: 16 }}>Performance Test</h2>
      <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: 24 }}>
        Open browser DevTools to monitor FPS. Target: 60fps (1 btn), 30fps+ (10 btns).
      </p>

      <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
        {counts.map((c) => (
          <button
            key={c}
            onClick={() => setActiveCount(c)}
            style={{
              background: activeCount === c ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 8,
              color: "#fff",
              padding: "8px 16px",
              cursor: "pointer",
            }}
          >
            {c} Button{c > 1 ? "s" : ""}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          alignItems: "center",
        }}
      >
        {Array.from({ length: activeCount }, (_, i) => (
          <GlassButton
            key={i}
            variant={i % 2 === 0 ? "capsule" : "sphere"}
            colorScheme={["rainbow", "pink", "cyan"][i % 3] as any}
            onClick={() => console.log(`Button ${i} clicked`)}
          >
            Button {i + 1}
          </GlassButton>
        ))}
      </div>
    </div>
  );
}

// Helper components
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 48 }}>
      <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 20, color: "rgba(255,255,255,0.9)" }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 12,
        color: "rgba(255,255,255,0.5)",
        marginBottom: 8,
        textTransform: "uppercase",
        letterSpacing: "0.1em",
      }}
    >
      {children}
    </div>
  );
}

function ControlGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label
        style={{
          display: "block",
          fontSize: 13,
          color: "rgba(255,255,255,0.6)",
          marginBottom: 6,
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

const selectStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.1)",
  border: "1px solid rgba(255,255,255,0.2)",
  borderRadius: 6,
  color: "#fff",
  padding: "8px 12px",
  fontSize: 14,
  width: "100%",
};
