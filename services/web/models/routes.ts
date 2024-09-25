import { getDictionary, MessageId } from "@/lib/dictionary";

const routes = ["", "/", "/hex", "/base64", "/svg-play-ground"] as const;

export type Route = typeof routes[number];


const routeTitleMap: Record<Route, string> = {
    "": "Home",
    "/": "Home",
    "/hex": "Hex",
    "/base64": "Base 64",
    "/svg-play-ground": "SVG Play Ground"
}