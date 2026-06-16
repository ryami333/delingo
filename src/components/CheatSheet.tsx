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
    <table>
      <tr>
        <td rowSpan={4}>Nominativ</td>
        <td>m</td>
        <td>
          <Word stem="kein" /> <Word stem="neu" ending="er" />{" "}
          <Word stem="Film" />
        </td>
      </tr>
      <tr>
        <td>n</td>
        <td>
          <Word stem="kein" /> <Word stem="neu" ending="es" />{" "}
          <Word stem="Buch" />
        </td>
      </tr>
      <tr>
        <td>f</td>
        <td>
          <Word stem="kein" ending="e" /> <Word stem="neu" ending="e" />{" "}
          <Word stem="Serie" />
        </td>
      </tr>
      <tr>
        <td>pl</td>
        <td>
          <Word stem="kein" ending="e" /> <Word stem="neu" ending="en" />{" "}
          <Word stem="Filme" />
        </td>
      </tr>
      <tr>
        <td rowSpan={4}>Akkusativ</td>
        <td>m</td>
        <td>
          <Word stem="kein" ending="en" /> <Word stem="neu" ending="en" />{" "}
          <Word stem="Film" />
        </td>
      </tr>
      <tr>
        <td>n</td>
        <td>
          <Word stem="kein" /> <Word stem="neu" ending="es" />{" "}
          <Word stem="Buch" />
        </td>
      </tr>
      <tr>
        <td>f</td>
        <td>
          <Word stem="kein" ending="e" /> <Word stem="neu" ending="e" />{" "}
          <Word stem="Serie" />
        </td>
      </tr>
      <tr>
        <td>pl</td>
        <td>
          <Word stem="kein" ending="e" /> <Word stem="neu" ending="en" />{" "}
          <Word stem="Filme" />
        </td>
      </tr>
      <tr>
        <td rowSpan={4}>Dativ</td>
        <td>m</td>
        <td>
          <Word stem="kein" ending="em" /> <Word stem="neu" ending="en" />{" "}
          <Word stem="Film" />
        </td>
      </tr>
      <tr>
        <td>n</td>
        <td>
          <Word stem="kein" ending="em" /> <Word stem="neu" ending="en" />{" "}
          <Word stem="Buch" />
        </td>
      </tr>
      <tr>
        <td>f</td>
        <td>
          <Word stem="kein" ending="er" /> <Word stem="neu" ending="en" />{" "}
          <Word stem="Serie" />
        </td>
      </tr>
      <tr>
        <td>pl</td>
        <td>
          <Word stem="kein" ending="en" /> <Word stem="neu" ending="en" />{" "}
          <Word stem="Filme" ending="n" />
        </td>
      </tr>
      <tr>
        <td rowSpan={4}>Genitiv</td>
        <td>m</td>
        <td>
          <Word stem="kein" ending="es" /> <Word stem="neu" ending="en" />{" "}
          <Word stem="Film" ending="s" />
        </td>
      </tr>
      <tr>
        <td>n</td>
        <td>
          <Word stem="kein" ending="es" /> <Word stem="neu" ending="en" />{" "}
          <Word stem="Buch" ending="es" />
        </td>
      </tr>
      <tr>
        <td>f</td>
        <td>
          <Word stem="kein" ending="er" /> <Word stem="neu" ending="en" />{" "}
          <Word stem="Serie" />
        </td>
      </tr>
      <tr>
        <td>pl</td>
        <td>
          <Word stem="kein" ending="er" /> <Word stem="neu" ending="en" />{" "}
          <Word stem="Filme" />
        </td>
      </tr>
    </table>
  );
}
