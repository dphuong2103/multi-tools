const routes = [
  "",
  "/",
  "/hex",
  "/base64",
  "/svg-play-ground",
  "/sql-formatter",
  "/code-editor",
] as const;

export type Route = (typeof routes)[number];
