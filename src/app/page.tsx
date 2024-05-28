import { Roboto } from "next/font/google";
import HomeScreen from "../screen/HomeScreen";
import styles from "./page.module.css";

const font = Roboto({ weight: "400", subsets: ["latin"] });

export default function Home() {
  return (
    <div className={styles.main}>
      <div className={font.className} style={{ width: "100%", maxWidth: "600px", minWidth: "300px" }}>
        <HomeScreen />
      </div>
    </div>
  );
}
