import React, { useEffect, useState } from "react";
import RoleSelectLanding, { UserRole } from "./components/RoleSelectLanding";
import DeckBuilder from "./pages/DeckBuilder";

type Route = "hub" | "cvttweb";

const buildPath = (path: string) => `${import.meta.env.BASE_URL}${path}`;

const deriveRoute = (): Route => {
  if (typeof window === "undefined") return "hub";
  const hash = window.location.hash.replace(/^#\/?/, "");
  if (hash.startsWith("cvttweb")) return "cvttweb";
  if (window.location.pathname.includes("/cvttweb")) return "cvttweb";
  return "hub";
};

const HubLanding: React.FC<{ onLaunchCvtt: () => void }> = ({ onLaunchCvtt }) => {
  const cardStyles: React.CSSProperties = {
    border: "1px solid var(--border)",
    borderRadius: 16,
    padding: "1.25rem",
    background: "var(--surface)",
    minHeight: 180,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: "0.75rem",
  };

  const openExternal = (path: string) => {
    window.location.href = buildPath(path);
  };

  const cards = [
    {
      id: "cvttweb",
      title: "Collapse Companion",
      description: "Player and GM tools (world events, deck builder, engram ops) with offline PWA support.",
      action: onLaunchCvtt,
      cta: "Open Companion",
      subtitle: "Runs inside this PWA",
    },
    {
      id: "chud",
      title: "cHUD",
      description: "Compact HUD for derived stats; keep it alongside your session.",
      action: () => openExternal("chud/"),
      cta: "Open cHUD",
      subtitle: "Standalone page",
    },
    {
      id: "csmatrix",
      title: "CS Matrix",
      description: "Campaign Support Matrix with draggable nodes, meters, and node drawers.",
      action: () => openExternal("csmatrix/"),
      cta: "Open CS Matrix",
      subtitle: "Standalone page",
    },
  ];

  return (
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: "min(1100px, 100%)", padding: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "1rem", flexWrap: "wrap" }}>
          <div>
            <h1 style={{ margin: "0 0 0.35rem 0" }}>Collapse Full Build</h1>
            <p style={{ margin: 0, color: "var(--muted)" }}>
              Launch any build directly. Each page works independently and stays offline once loaded.
            </p>
          </div>
          <span style={{ color: "var(--muted)", fontSize: "0.95rem" }}>{buildPath("")}</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem", marginTop: "1.5rem" }}>
          {cards.map((card) => (
            <div key={card.id} style={cardStyles}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "baseline" }}>
                  <h2 style={{ margin: 0 }}>{card.title}</h2>
                  <span style={{ color: "var(--muted)", fontSize: "0.9rem" }}>{card.subtitle}</span>
                </div>
                <p style={{ color: "var(--muted)", marginTop: "0.5rem" }}>{card.description}</p>
              </div>
              <button onClick={card.action}>{card.cta}</button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default function App() {
  const [route, setRoute] = useState<Route>(() => deriveRoute());
  const [role, setRole] = useState<UserRole | null>(null);

  useEffect(() => {
    const syncRoute = () => setRoute(deriveRoute());
    syncRoute();
    window.addEventListener("hashchange", syncRoute);
    window.addEventListener("popstate", syncRoute);
    return () => {
      window.removeEventListener("hashchange", syncRoute);
      window.removeEventListener("popstate", syncRoute);
    };
  }, []);

  useEffect(() => {
    if (route === "cvttweb" && (typeof window !== "undefined") && !window.location.hash.includes("cvttweb")) {
      window.location.hash = "#/cvttweb";
    }
  }, [route]);

  if (route === "cvttweb") {
    if (!role) {
      return <RoleSelectLanding onSelect={setRole} />;
    }
    return <DeckBuilder />;
  }

  return <HubLanding onLaunchCvtt={() => setRoute("cvttweb")} />;
}
