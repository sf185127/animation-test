import Lottie from "react-lottie";
import "./App.css";
import * as animationData from "./receipt_test.json";
import { folder, useControls } from "leva";
import { hexToHsluv } from "hsluv";
import { useMemo } from "react";
import { bezier } from "@leva-ui/plugin-bezier";

/**
 * This is a component to manipulate css variables based on the inputs
 * Uses leva internally for the control panel
 */
const ColorController = () => {
  // leva control panel
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

  // pull out hue from primary collor
  const h = useMemo(() => hexToHsluv(color)[0], [color]);

  return (
    <style>
      {/* create a css var based on the hue of the selected primary color */}
      {`:root { --primary-hue: ${h} }`}
      {/* for each shade, attach a css property hsl ( primary hue var, selected saturation , shade number ) */}
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
  const options = {
    loop: true,
    // need an extendable object so have to destruct animation data
    animationData: { ...animationData },
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
