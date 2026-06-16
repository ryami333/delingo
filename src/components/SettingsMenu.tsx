import { ActionIcon, Menu } from "@mantine/core";
import { IconCheck, IconSettings } from "@tabler/icons-react";

export function SettingsMenu({
  showHints,
  onToggleShowHints,
  showCheatSheet,
  onToggleShowCheatSheet,
}: {
  showHints: boolean;
  onToggleShowHints: () => void;
  showCheatSheet: boolean;
  onToggleShowCheatSheet: () => void;
}) {
  return (
    <Menu
      shadow="md"
      width={200}
      position="top-end"
      withArrow
      closeOnItemClick={false}
    >
      <Menu.Target>
        <ActionIcon
          variant="default"
          size="xl"
          radius="xl"
          aria-label="Settings"
          style={{
            position: "fixed",
            bottom: "var(--mantine-spacing-xl)",
            right: "var(--mantine-spacing-xl)",
            zIndex: 200,
          }}
        >
          <IconSettings stroke={1.5} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Settings</Menu.Label>
        <Menu.Item
          leftSection={
            <IconCheck
              size={16}
              style={{ visibility: showHints ? "visible" : "hidden" }}
            />
          }
          onClick={onToggleShowHints}
        >
          Show Hints
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconCheck
              size={16}
              style={{ visibility: showCheatSheet ? "visible" : "hidden" }}
            />
          }
          onClick={onToggleShowCheatSheet}
        >
          Show Cheat Sheet
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
