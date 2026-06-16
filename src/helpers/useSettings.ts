import { useState } from "react";

export type Settings = {
  showHints: boolean;
};

export const defaultSettings: Settings = {
  showHints: false,
};

/**
 * Central store for user-facing app settings.
 *
 * Currently backed by `useState`, so settings reset on reload. To persist
 * across sessions, swap the `useState` call below for Mantine's
 * `useLocalStorage` — the rest of the API stays identical:
 *
 *   const [settings, setSettings] = useLocalStorage<Settings>({
 *     key: "delingo:settings",
 *     defaultValue: defaultSettings,
 *   });
 *
 * (See the notes in the chat for the trade-offs between this, a hand-rolled
 * localStorage hook, and a Context-based settings provider.)
 */
export function useSettings() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  function setSetting<K extends keyof Settings>(key: K, value: Settings[K]) {
    setSettings((current) => ({ ...current, [key]: value }));
  }

  function toggleSetting(
    key: {
      [K in keyof Settings]: Settings[K] extends boolean ? K : never;
    }[keyof Settings],
  ) {
    setSettings((current) => ({ ...current, [key]: !current[key] }));
  }

  return { settings, setSetting, toggleSetting };
}
