import { useCallback } from "react";

export function useClickSound() {
  const playClickSound = useCallback(async () => {
    try {
      const audio = new Audio("/sounds/click.mp3");
      audio.volume = 0.2; // Volume modéré pour les clics

      // Attendre que l'audio soit chargé
      await audio.load();

      // Essayer de jouer le son
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        await playPromise;
      }
    } catch (error) {
      console.warn("Impossible de jouer le son de clic:", error);
      // Continuer sans le son si il y a une erreur
    }
  }, []);

  return playClickSound;
}
