import { useLocalStorage } from "@mantine/hooks";
import z from "zod";

export const settingsSchema = z.object({
  showHints: z.boolean().default(false),
  showCheatSheet: z.boolean().default(false),
});

export type Settings = z.output<typeof settingsSchema>;

// Parsing an empty object lets each field's `.default()` populate it.
export const defaultSettings: Settings = settingsSchema.parse({});

const STORAGE_KEY = "delingo:settings";

/**
 * Parse a persisted settings string. Because every field has a `.default()`,
 * missing fields fall back to their default rather than coming back
 * `undefined` for users with older persisted values. Malformed or invalid
 * stored data falls back to the full defaults.
 */
function deserializeSettings(str: string | undefined) {
  if (str === undefined) return defaultSettings;
  return settingsSchema.catch(defaultSettings).parse(JSON.parse(str));
}

/**
 * Central store for user-facing app settings, persisted to localStorage.
 *
 * Backed by Mantine's `useLocalStorage`, which handles reading the initial
 * value from storage and syncing across tabs via the `storage` event. The
 * stored value is validated/coerced through `settingsSchema` on read.
 */
export function useSettings() {
  const [settings, setSettings] = useLocalStorage<Settings>({
    key: STORAGE_KEY,
    defaultValue: defaultSettings,
    deserialize: deserializeSettings,
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
