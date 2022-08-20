import Lottie from "react-lottie";
import "./App.css";
import * as animationData from "./receipt_test.json";
import { folder, useControls } from "leva";
import { hexToHsluv } from "hsluv";
import { useMemo } from "react";
import { bezier } from "@leva-ui/plugin-bezier";

const ColorController = () => {
  const { color, saturation, luminanceCurve } = useControls({
    color: { value: "#F00", label: "Primary Color" },
    saturation: { value: 0.5, min: 0, max: 1 },
    Luminance: folder(
      {
        luminanceCurve: bezier("linear"),
      },
      { collapsed: true }
    ),
  });

  const h = useMemo(() => hexToHsluv(color)[0], [color]);

  return (
    <style>
      {`:root { --primary-hue: ${h} }`}
      {[100, 200, 300, 400, 500, 600, 700, 800, 900].map(
        (x) =>
          `.fill-primary-${x} {fill: hsl(var(--primary-hue), ${
            saturation * 100
          }%, ${luminanceCurve.evaluate((1000 - x) / 10 / 100) * 100}%);}`
      )}
    </style>
  );
};

function App() {
  const data = JSON.parse(
    JSON.stringify(animationData).replace(`fill-primary-700`, `#FF0000`)
  );

  const options = {
    loop: true,
    animationData: data,
    autoplay: true,
  };

  return (
    <div className="App">
      <ColorController />
      <Lottie options={options} height={400} width={400} />
    </div>
  );
}

export default App;
