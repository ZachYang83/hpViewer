import { loadModules } from "esri-loader";
import { layerData } from "@/components/common/layerTree/layerData";
import Scene from "@/sdk/scene/scene"

let MapInit = {
    gzpiScene: new Scene(),
    creatMap:  function () {
        MapInit.gzpiScene.initialize(MAP.viewer, layerData);
    }
};

export default MapInit;