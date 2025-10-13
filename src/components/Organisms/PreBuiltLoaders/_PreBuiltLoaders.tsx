import React, { useEffect, useState } from "react";
import { Text } from "@Reptile/Components/Atoms";
import { controlled } from "@Reptile/Framework";
import Lottie from "react-lottie-player";

import "./_PreBuiltLoaders.scss";

// Sample pre-built Lottie loader list
// export const lottieLoaders = [
//   {
//     name: "Airplane",
//     path: "https://reptileimagedatastore.blob.core.windows.net/loaders/Airplane Around the World.json",
//   },
//   {
//     name: "Financial Charts",
//     path: "https://reptileimagedatastore.blob.core.windows.net/loaders/Financial charts and statistics on tab with up arrow.json",
//   },
//   {
//     name: "Smooth Dots Spinner",
//     path: "https://reptileimagedatastore.blob.core.windows.net/loaders/Loading (2).json",
//   },
//   {
//     name: "Loading Files",
//     path: "https://reptileimagedatastore.blob.core.windows.net/loaders/Loading Files.json",
//   },
//   {
//     name: "Loading Circles",
//     path: "https://reptileimagedatastore.blob.core.windows.net/loaders/Loading circles.json",
//   },
//   {
//     name: "Sand Clock",
//     path: "https://reptileimagedatastore.blob.core.windows.net/loaders/Loading sand clock.json",
//   },
//   {
//     name: "PacMan",
//     path: "https://reptileimagedatastore.blob.core.windows.net/loaders/Loading_PacMan.json",
//   },
//   {
//     name: "Car",
//     path: "https://reptileimagedatastore.blob.core.windows.net/loaders/Loading_car.json",
//   },
//   {
//     name: "Blocks Loader",
//     path: "https://reptileimagedatastore.blob.core.windows.net/loaders/loading (1).json",
//   },
//   {
//     name: "Text Loader",
//     path: "https://reptileimagedatastore.blob.core.windows.net/loaders/loading.json",
//   },
//   ///
//   {
//     name: "Spinner",
//     path: "https://assets1.lottiefiles.com/packages/lf20_usmfx6bp.json",
//   },
//   {
//     name: "Flipping Box Loader",
//     path: "https://assets1.lottiefiles.com/packages/lf20_p8bfn5to.json",
//   },
// ];

const LottieThumbnail = ({ src }: { src: string }) => {
  const [json, setJson] = useState(null);

  useEffect(() => {
    fetch(src)
      .then((res) => res.json())
      .then((value) => setJson(value))
      .catch(console.error);
  }, []);

  return json ? (
    <div style={{ width: 100, height: 100 }}>
      <Lottie loop play path={src} style={{ width: "100%", height: "100%" }} />
    </div>
  ) : (
    <div>Loading...</div>
  );
};

const _PreBuiltLoaders = controlled<
  Reptile.Props.TemplateBuilderSidePanelProps,
  Reptile.Controllers.IAppBuildController
>(({ className, style, controller }) => {
  const [preBuiltLoadersList, setPreBuiltLoadersList] = useState<
    Reptile.Service.Loader[]
  >([]);
  const [selectedLoader, setSelectedLoader] = useState<any | null>(controller.preBuiltSelectedLoader);

  useEffect(() => {
    controller.getPrebuiltLoaders();
  }, []);

  useEffect(() => {
    setPreBuiltLoadersList(controller.preBuiltLoadersList);
  }, [controller.preBuiltLoadersList]);

  useEffect(() => {
    controller.preBuiltSelectedLoader = selectedLoader;
    if (controller.activePage === "Load Spinner" && selectedLoader) {
      if (controller.widgets.length > 0) {
        controller.widgets[0].styles.backgroundImage = `url("${selectedLoader.path}")`;
      } else {
        controller.add("loadie", 0, selectedLoader.path);
      }
    }
  }, [selectedLoader]);

  return (
    <div className="loader-list">
      {preBuiltLoadersList.map((loader) => (
        <div
          key={loader.name}
          className={`loader-item ${
            selectedLoader?.name === loader.name ? "active-item" : ""
          }`}
          onClick={() => setSelectedLoader(loader)}
        >
          <LottieThumbnail src={loader.path} />
          <Text size="small" color="dark-gray">
            {loader.name}
          </Text>
        </div>
      ))}
    </div>
  );
});

export default _PreBuiltLoaders;
