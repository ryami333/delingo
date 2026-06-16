import { Table } from "@mantine/core";
import styles from "./CheatSheet.module.css";

const cx = (className: string) => styles[className];

/** Renders a word with its declension ending highlighted in a styled span. */
function Word({ stem, ending }: { stem: string; ending?: string }) {
  return (
    <>
      {stem}
      {ending ? <span className={cx("word-ending")}>{ending}</span> : null}
    </>
  );
}

export function CheatSheet() {
  return (
    <Table striped highlightOnHover withTableBorder withColumnBorders>
      <Table.Tbody>
        <Table.Tr className={cx("m")}>
          <Table.Td rowSpan={4}>Nominativ</Table.Td>
          <Table.Td>m</Table.Td>
          <Table.Td>
            <Word stem="kein" /> <Word stem="neu" ending="er" />{" "}
            <Word stem="Brief" />
          </Table.Td>
        </Table.Tr>
        <Table.Tr className={cx("n")}>
          <Table.Td>n</Table.Td>
          <Table.Td>
            <Word stem="kein" /> <Word stem="neu" ending="es" />{" "}
            <Word stem="Bild" />
          </Table.Td>
        </Table.Tr>
        <Table.Tr className={cx("f")}>
          <Table.Td>f</Table.Td>
          <Table.Td>
            <Word stem="kein" ending="e" /> <Word stem="neu" ending="e" />{" "}
            <Word stem="Karte" />
          </Table.Td>
        </Table.Tr>
        <Table.Tr className={cx("pl")}>
          <Table.Td>pl</Table.Td>
          <Table.Td>
            <Word stem="kein" ending="e" /> <Word stem="neu" ending="en" />{" "}
            <Word stem="Briefe" />
          </Table.Td>
        </Table.Tr>
        <Table.Tr className={cx("m")}>
          <Table.Td rowSpan={4}>Akkusativ</Table.Td>
          <Table.Td>m</Table.Td>
          <Table.Td>
            <Word stem="kein" ending="en" /> <Word stem="neu" ending="en" />{" "}
            <Word stem="Brief" />
          </Table.Td>
        </Table.Tr>
        <Table.Tr className={cx("n")}>
          <Table.Td>n</Table.Td>
          <Table.Td>
            <Word stem="kein" /> <Word stem="neu" ending="es" />{" "}
            <Word stem="Bild" />
          </Table.Td>
        </Table.Tr>
        <Table.Tr className={cx("f")}>
          <Table.Td>f</Table.Td>
          <Table.Td>
            <Word stem="kein" ending="e" /> <Word stem="neu" ending="e" />{" "}
            <Word stem="Karte" />
          </Table.Td>
        </Table.Tr>
        <Table.Tr className={cx("pl")}>
          <Table.Td>pl</Table.Td>
          <Table.Td>
            <Word stem="kein" ending="e" /> <Word stem="neu" ending="en" />{" "}
            <Word stem="Briefe" />
          </Table.Td>
        </Table.Tr>
        <Table.Tr className={cx("m")}>
          <Table.Td rowSpan={4}>Dativ</Table.Td>
          <Table.Td>m</Table.Td>
          <Table.Td>
            <Word stem="kein" ending="em" /> <Word stem="neu" ending="en" />{" "}
            <Word stem="Brief" />
          </Table.Td>
        </Table.Tr>
        <Table.Tr className={cx("n")}>
          <Table.Td>n</Table.Td>
          <Table.Td>
            <Word stem="kein" ending="em" /> <Word stem="neu" ending="en" />{" "}
            <Word stem="Bild" />
          </Table.Td>
        </Table.Tr>
        <Table.Tr className={cx("f")}>
          <Table.Td>f</Table.Td>
          <Table.Td>
            <Word stem="kein" ending="er" /> <Word stem="neu" ending="en" />{" "}
            <Word stem="Karte" />
          </Table.Td>
        </Table.Tr>
        <Table.Tr className={cx("pl")}>
          <Table.Td>pl</Table.Td>
          <Table.Td>
            <Word stem="kein" ending="en" /> <Word stem="neu" ending="en" />{" "}
            <Word stem="Briefe" ending="n" />
          </Table.Td>
        </Table.Tr>
        <Table.Tr className={cx("m")}>
          <Table.Td rowSpan={4}>Genitiv</Table.Td>
          <Table.Td>m</Table.Td>
          <Table.Td>
            <Word stem="kein" ending="es" /> <Word stem="neu" ending="en" />{" "}
            <Word stem="Brief" ending="s" />
          </Table.Td>
        </Table.Tr>
        <Table.Tr className={cx("n")}>
          <Table.Td>n</Table.Td>
          <Table.Td>
            <Word stem="kein" ending="es" /> <Word stem="neu" ending="en" />{" "}
            <Word stem="Bild" ending="es" />
          </Table.Td>
        </Table.Tr>
        <Table.Tr className={cx("f")}>
          <Table.Td>f</Table.Td>
          <Table.Td>
            <Word stem="kein" ending="er" /> <Word stem="neu" ending="en" />{" "}
            <Word stem="Karte" />
          </Table.Td>
        </Table.Tr>
        <Table.Tr className={cx("pl")}>
          <Table.Td>pl</Table.Td>
          <Table.Td>
            <Word stem="kein" ending="er" /> <Word stem="neu" ending="en" />{" "}
            <Word stem="Briefe" />
          </Table.Td>
        </Table.Tr>
      </Table.Tbody>
    </Table>
  );
}
