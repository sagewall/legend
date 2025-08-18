import "@arcgis/map-components/components/arcgis-layer-list";
import "@arcgis/map-components/components/arcgis-legend";
import "@arcgis/map-components/components/arcgis-map";
import "@esri/calcite-components/components/calcite-shell";
import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app")!;

const shell = document.createElement("calcite-shell");

const map = document.createElement("arcgis-map");
map.itemId = "e66cdb0c412245c6b0d8e58346a115fb";

const legend = document.createElement("arcgis-legend");
legend.referenceElement = map;
legend.slot = "top-right";
map.appendChild(legend);

const layerList = document.createElement("arcgis-layer-list");
layerList.referenceElement = map;
layerList.slot = "top-left";
map.appendChild(layerList);

shell.appendChild(map);
app.appendChild(shell);
