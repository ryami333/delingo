import { useLocalStorage } from "@mantine/hooks";

export type Settings = {
  showHints: boolean;
};

export const defaultSettings: Settings = {
  showHints: false,
};

const STORAGE_KEY = "delingo:settings";

/**
 * Central store for user-facing app settings, persisted to localStorage.
 *
 * Backed by Mantine's `useLocalStorage`, which handles serialization, reads the
 * initial value from storage, and syncs across tabs via the `storage` event.
 * The `deserialize` merge means new fields added to `Settings` fall back to
 * their default rather than coming back `undefined` for users with older
 * persisted values.
 */
export function useSettings() {
  const [settings, setSettings] = useLocalStorage<Settings>({
    key: STORAGE_KEY,
    defaultValue: defaultSettings,
    deserialize: (str) =>
      str === undefined
        ? defaultSettings
        : { ...defaultSettings, ...(JSON.parse(str) as Partial<Settings>) },
  });

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
