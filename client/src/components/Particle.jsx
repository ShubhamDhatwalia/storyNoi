import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useMemo, useState } from "react";
import { loadSlim } from "@tsparticles/slim";

const Particle = (props) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const options = useMemo(
    () => ({
      fullScreen: {
        enable: false,
      },
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: {
            enable: true,
             mode: "repulse",
          },
          onClick: {
            enable: false,
          },
        },
      },
      particles: {
        number: {
          value: 40, // ⬆️ Increased quantity
          density: {
            enable: true,
            area: 1000,
          },
        },
        color: {
          value: "#fff",
        },
        shape: {
          type: ["polygon"], // 🔥 Mixed hexagons & points
          options: {
            polygon: {
              sides: 6, // hexagons
            },
          },
        },
        opacity: {
          value: 0, // a bit more visible
        },
        size: {
          value: {
            min: 3,
            max: 40, // small for points, bigger for hexagons
          },
        },
        stroke: {
          width: 0.6,
          color: "#ffffff",
          join: "miter",
        },
        collisions: {
            enable: true, // ✅ prevent overlap
            // mode: "bounce",
          },
        move: {
          enable: true,
          speed: 2, // smooth float
          direction: "none",
          random: true,
          straight: false,
          outModes: {
            default: "bounce",
          },
        },
        links: {
          enable: false, // ✅ Connect particles with lines
          distance: 150, // how close to connect
          color: "#ffffff",
          opacity: 0.2,
          width: 1,
        },
      },
      detectRetina: true,
    }),
    []
  );

  return (
    <Particles
      id={props.id}
      init={particlesLoaded}
      options={options}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        zIndex: 0, // behind other content
      }}
    />
  );
};

export default Particle;
