<template>
  <div class="basemap">
    <div id="mapContain">
      <tool-bar></tool-bar>
    </div>
  </div>
</template>

<script>
import * as gzpiMap from "@/sdk/index.js";
import { loadModules } from "esri-loader";
import ToolBar from "@/components/layout/ToolBar.vue";
import LayerTree from "@/sdk/layer/layerTree";
import MapInit from "./map";

window.gzpiMap = gzpiMap;
const options = {
  //引入ArcGIS API
  url: "https://js.arcgis.com/4.18/init.js",
  css: "https://js.arcgis.com/4.18/esri/themes/light/main.css",
};
export default {
  components: {
    ToolBar,
  },
  mounted() {
    this.initMap();
    // this.initLayer();
  },
  methods: {
    async initMap() {
      const [
        Map,
        SceneView,
        MapView,
        Basemap,
        CoordinateConversion,
        Compass,
        TileLayer,
        FeatureLayer,
        MapImageLayer,
        TileInfo,
        WebTileLayer,
        WMTSLayer,
        BasemapToggle,
      ] = await loadModules(
        [
          "esri/Map",
          "esri/views/SceneView",
          "esri/views/MapView",
          "esri/Basemap",
          "esri/widgets/CoordinateConversion",
          "esri/widgets/Compass",
          "esri/layers/TileLayer",
          "esri/layers/FeatureLayer",
          "esri/layers/MapImageLayer",
          "esri/layers/support/TileInfo",
          "esri/layers/WebTileLayer",
          "esri/layers/WMTSLayer",
          "esri/widgets/BasemapToggle",
        ],
        options
      );

      let geoqlayer = new TileLayer({
        url: "http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer",
        // url:"https://api.mapbox.com/styles/v1",
        id: "baseLayer",
      });
      var map = new Map({
        // basemap: new Basemap({ baseLayers: [geoqlayer] }),
        basemap: "hybrid",
        groud: "world-elevation",
        logo: false,
      });

      var view = new SceneView({
        container: "mapContain",
        map: map,
        scale: 50000,
        center: [113.499, 23.15],
      });

      MAP.maper = map;
      MAP.viewer = view;
      MAP.loader = {
        TileLayer: TileLayer,
        FeatureLayer: FeatureLayer,
        MapImageLayer: MapImageLayer,
      };
      MAP.viewer.ui.remove("attribution");
      this.initLayer();
    },
    initLayer() {
      let _t = this;
      if (!window.MAP.layerTree) {
        window.MAP.layerTree = new LayerTree();
      }
      MapInit.creatMap();
    },
  },
};
</script>

<style lang="scss" scoped>
.basemap {
  position: relative;
  display: flex;
  height: 100%;

  #mapContain {
    position: relative;
    height: 100%;
    flex: 1;
  }
}
</style>