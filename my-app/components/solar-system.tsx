"use client";

import { useMobile } from "@/lib/hooks/use-mobile";
import { type PlanetData, planets, sunData, SunData } from "@/lib/planet-data";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useSpring } from "@react-spring/three";

import Galaxy from "@/components/galaxy";
import GalaxyControls from "@/components/GalaxyControls";
import Planet from "@/components/planet";
import PlanetInfo from "@/components/planet-info";
import Sun from "@/components/sun";
import AudioButton from "./audio-button";
import FullscreenButton from "./fullscreen-button";
import Legend from "./legend";
import LoadingScreen from "./loading-screen";
import PerformanceMonitor from "./performance-monitor";
import SunInfo from "./sun-info";

import ApodCard from "@/components/nasa/ApodCard";
import DonkiCard from "@/components/nasa/DonkiCard";
import MarsCard from "@/components/nasa/MarsCard";
import NeoCard from "@/components/nasa/NeoCard";
import SideMenu from "@/components/side-menu";
import ReverseAsteroid from "@/components/ReverseAsteroid";

import { fetchExoplanetFromAPI } from "@/lib/hooks/fetch-exoplanet";
import Star from "@/components/star";

export default function SolarSystem() {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);
  const [selectedSun, setSelectedSun] = useState<SunData | null>(null);
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [quality, setQuality] = useState<"high" | "medium" | "low">("high");
  const [isLoading, setIsLoading] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [isTopView, setIsTopView] = useState(false);
  const [extraPlanets, setExtraPlanets] = useState<PlanetData[]>([]);
  const [extraStars, setExtraStars] = useState<any[]>([]);
  const [inputName, setInputName] = useState("Kepler-22 b");

  const [isApodVisible, setIsApodVisible] = useState(false);
  const [isMarsVisible, setIsMarsVisible] = useState(false);
  const [isNeoVisible, setIsNeoVisible] = useState(false);
  const [isDonkiVisible, setIsDonkiVisible] = useState(false);

  const [isSaturnVisible, setIsSaturnVisible] = useState(true);
  const [saturnExploded, setSaturnExploded] = useState(false);
  const saturnRef = useRef<THREE.Mesh>(null);

  const { scale: saturnScale } = useSpring<{ scale: [number, number, number] }>(
    {
      scale: saturnExploded ? [0, 0, 0] : [1, 1, 1],
      config: { mass: 1, tension: 120, friction: 14 },
      onChange: ({ value }) => {
        if (
          saturnRef.current &&
          value.scale &&
          Array.isArray(value.scale) &&
          value.scale.length === 3
        ) {
          const [x, y, z] = value.scale;
          saturnRef.current.scale.set(x, y, z);
        }
      },
    }
  );

  const controlsRef = useRef(null);
  const isMobile = useMobile();
  const router = useRouter();

  const cameraPosition: [number, number, number] = isMobile
    ? [0, 20, 40]
    : [0, 20, 30];
  const cameraFov = isMobile ? 60 : 45;

  const getDPR = () => {
    if (isMobile) {
      return quality === "high" ? 1 : 0.75;
    }
    return quality === "high" ? 2 : quality === "medium" ? 1.5 : 1;
  };

  const handleQualityChange = (newQuality: "high" | "medium" | "low") => {
    setQuality(newQuality);
  };

  const handleSunClick = () => {
    setSelectedSun(sunData);
    setSelectedPlanet(null);
    setIsInfoVisible(true);
  };

  const handlePlanetClick = (planet: PlanetData) => {
    setSelectedPlanet(planet);
    setSelectedSun(null);
    setIsInfoVisible(true);
  };

  const handleCloseInfo = () => {
    setIsInfoVisible(false);
    setTimeout(() => {
      setSelectedPlanet(null);
      setSelectedSun(null);
    }, 300);
  };

  const onZoomToPlanet = () => {
    if (!selectedPlanet || !controlsRef.current) return;
    const { distanceFromSun, size } = selectedPlanet;
    const cam = (controlsRef.current as any).object;
    cam.position.set(distanceFromSun, size * 3, distanceFromSun + 5);
    cam.lookAt(distanceFromSun, 0, 0);
  };

  const handleFetchByName = async () => {
    try {
      const system = await fetchExoplanetFromAPI(inputName);
      if (!system) return alert("Planète introuvable");
      setExtraPlanets((prev) => [...prev, system.planet]);
      setExtraStars((prev) => [...prev, system.star]);
    } catch (e) {
      console.error(e);
      alert("Erreur lors de la récupération");
    }
  };

  useEffect(() => {
    const autoLoadFirstExoplanets = async () => {
      const names = [
        "Kepler-22 b",
        "Kepler-186 f",
        "TRAPPIST-1 b",
        "TOI-700 d",
        "Gliese 581 d",
        "HD 40307 g",
        "Kepler-62 f",
        "55 Cancri e",
        "Proxima Centauri b",
        "K2-18 b",
        "LHS 1140 b",
        "Kepler-442 b",
        "Kepler-452 b",
        "Wolf 1061 c",
        "Ross 128 b",
        "GJ 667 C c",
        "GJ 1214 b",
        "Kepler-69 c",
        "Kapteyn b",
        "HD 189733 b",
        "HD 209458 b",
        "Kepler-1649 c",
        "Kepler-62 e",
        "TRAPPIST-1 e",
        "TRAPPIST-1 f",
        "TRAPPIST-1 g",
        "TRAPPIST-1 h",
        "TOI-1231 b",
        "Kepler-90 g",
        "HD 219134 b",
      ];

      for (const name of names) {
        const system = await fetchExoplanetFromAPI(name);
        if (system) {
          setExtraPlanets((prev) => [...prev, system.planet]);
          setExtraStars((prev) => [...prev, system.star]);
        }
      }
    };

    autoLoadFirstExoplanets();

    if (!controlsRef.current) return;
    const cam = (controlsRef.current as any).object;
    if (isTopView) {
      cam.position.set(0, 60, 0);
      cam.lookAt(0, 0, 0);
    } else {
      cam.position.set(...cameraPosition);
      cam.lookAt(0, 0, 0);
    }
  }, []);

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
      )}
      <FullscreenButton />
      <AudioButton />

      <div className="absolute top-4 left-4 z-50 bg-black/60 text-white p-4 rounded flex flex-col gap-2">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Nom de l’exoplanète"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            className="text-black px-2 py-1 rounded"
          />
          <button
            onClick={handleFetchByName}
            className="bg-white text-black px-3 py-1 rounded"
          >
            Ajouter
          </button>
        </div>
      </div>

      <Canvas
        camera={{
          position: cameraPosition,
          fov: cameraFov,
          near: 0.1,
          far: 1000,
        }}
        dpr={getDPR()}
        gl={{
          antialias: quality === "high" && !isMobile,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
          alpha: false,
        }}
      >
        <PerformanceMonitor onQualityChange={handleQualityChange} />
        <color attach="background" args={["#000"]} />
        <ambientLight intensity={0.6} />
        <pointLight position={[0, 0, 0]} intensity={2} />

        <Galaxy />
        <Sun onClick={handleSunClick} />

        {planets.map((planet) => {
          const isSaturn = planet.name === "Saturn";
          if (isSaturn && !isSaturnVisible) return null;

          return (
            <Planet
              key={planet.name}
              planet={planet}
              onClick={() => handlePlanetClick(planet)}
              speedMultiplier={speedMultiplier}
              ref={isSaturn ? saturnRef : undefined}
              customScale={isSaturn ? saturnScale : undefined}
            />
          );
        })}

        {extraPlanets.map((planet) => (
          <Planet
            key={planet.id}
            planet={planet}
            onClick={() => handlePlanetClick(planet)}
            speedMultiplier={speedMultiplier}
          />
        ))}

        {extraStars.map((star) => (
          <Star key={star.id} star={star} />
        ))}

        <ReverseAsteroid visible={isSaturnVisible} delay={4} speed={0.3} />

        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          minDistance={5}
          maxDistance={100}
        />
      </Canvas>

      <SideMenu
        onOpenApod={() => setIsApodVisible(true)}
        onOpenMars={() => setIsMarsVisible(true)}
        onOpenNeo={() => setIsNeoVisible(true)}
        onOpenDonki={() => setIsDonkiVisible(true)}
      />

      {selectedPlanet && (
        <PlanetInfo
          planet={selectedPlanet}
          onClose={handleCloseInfo}
          isVisible={isInfoVisible}
        />
      )}

      {selectedSun && (
        <SunInfo
          sun={selectedSun}
          onClose={handleCloseInfo}
          isVisible={isInfoVisible}
        />
      )}

      {isApodVisible && <ApodCard onClose={() => setIsApodVisible(false)} />}
      {isMarsVisible && <MarsCard onClose={() => setIsMarsVisible(false)} />}
      {isNeoVisible && <NeoCard onClose={() => setIsNeoVisible(false)} />}
      {isDonkiVisible && <DonkiCard onClose={() => setIsDonkiVisible(false)} />}

      <GalaxyControls
        speedMultiplier={speedMultiplier}
        setSpeedMultiplier={setSpeedMultiplier}
        isTopView={isTopView}
        setIsTopView={setIsTopView}
        onZoomToPlanet={onZoomToPlanet}
      />

      <Legend />
    </div>
  );
}
