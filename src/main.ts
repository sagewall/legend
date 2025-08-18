import "@arcgis/map-components/components/arcgis-layer-list";
import "@arcgis/map-components/components/arcgis-legend";
import "@arcgis/map-components/components/arcgis-map";
import "@esri/calcite-components/components/calcite-navigation";
import "@esri/calcite-components/components/calcite-option";
import "@esri/calcite-components/components/calcite-select";
import "@esri/calcite-components/components/calcite-shell";
import "@esri/calcite-components/components/calcite-shell-panel";
import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app")!;

const shell = document.createElement("calcite-shell");

const navigation = document.createElement("calcite-navigation");
navigation.label = "Legend Testing";
navigation.slot = "header";

const webMapSelect = document.createElement("calcite-select");
webMapSelect.label = "Web Map";
webMapSelect.slot = "content-end";

const webMaps = [
  {
    label: "Various Renderer Tests",
    value: "e66cdb0c412245c6b0d8e58346a115fb",
  },
  { label: "Binning", value: "08c2bea3b9f444918157b722296682f0" },
  { label: "Points", value: "deabb79be4f24d90b834c6860cb7b21c" },
  { label: "Polygons", value: "d3e2365eb6da4cf986717a5bced01d3a" },
  {
    label: "Spikes and time series",
    value: "0bd951a1dd6a45ea8aeb44fffbf4c6bf",
  },
];

webMaps.forEach((webMap) => {
  const option = document.createElement("calcite-option");
  option.innerText = webMap.label;
  option.label = webMap.label;
  option.value = webMap.value;
  webMapSelect.appendChild(option);
});

navigation.appendChild(webMapSelect);

shell.appendChild(navigation);

const map = document.createElement("arcgis-map");
map.itemId = "e66cdb0c412245c6b0d8e58346a115fb";

shell.appendChild(map);

const legendShellPanel = document.createElement("calcite-shell-panel");
legendShellPanel.slot = "panel-end";
legendShellPanel.width = "l";
legendShellPanel.resizable = true;

const legend = document.createElement("arcgis-legend");
legend.referenceElement = map;

legendShellPanel.appendChild(legend);
shell.appendChild(legendShellPanel);

const layerListShellPanel = document.createElement("calcite-shell-panel");
layerListShellPanel.slot = "panel-start";
layerListShellPanel.width = "l";
layerListShellPanel.resizable = true;

const layerList = document.createElement("arcgis-layer-list");
layerList.referenceElement = map;
layerList.visibilityAppearance = "checkbox";
layerList.listItemCreatedFunction = (event) => {
  const { item } = event;
  if (item.layer?.type != "group") {
    item.panel = {
      content: "legend",
      open: true,
    };
  }
};

layerListShellPanel.appendChild(layerList);
shell.appendChild(layerListShellPanel);

app.appendChild(shell);

webMapSelect.addEventListener("calciteSelectChange", () => {
  const selectedValue = webMapSelect.value;
  map.itemId = selectedValue;
});
