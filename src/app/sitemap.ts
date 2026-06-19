import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://planet-engine-handbook.vercel.app";
  const routes = [
    "",
    "/adr",
    "/glossary",
    "/reports",
    "/roadmap",
    "/settings",
    "/architecture/system",
    "/architecture/dependencies",
    "/architecture/sequence",
    "/architecture/data-flow",
    "/architecture/db-relations",
    "/architecture/pipelines/forecast",
    "/architecture/pipelines/scheduler",
    "/architecture/pipelines/storm",
    "/repository/backend",
    "/repository/frontend",
    "/repository/admin",
    "/repository/physics",
    "/repository/weather",
    "/repository/ocean",
    "/repository/forecast",
    "/repository/storm-engine",
    "/repository/scheduler",
    "/repository/metadata",
    "/repository/importer",
    "/repository/search",
    "/repository/db",
    "/repository/api",
    "/repository/infrastructure",
    "/mathematics/wave-equations",
    "/mathematics/storm-equations",
    "/mathematics/pde",
    "/mathematics/ode",
    "/mathematics/optimization",
    "/mathematics/forecast-models",
    "/mathematics/confidence-models",
    "/mathematics/calibration",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : route.split("/").length > 2 ? 0.5 : 0.8,
  }));
}
