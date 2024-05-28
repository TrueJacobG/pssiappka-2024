import { Profile } from "@/types/Profile";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import Image from "next/image";
import { useState } from "react";

interface Props {
  profile: Profile;
  setProfile: (value: Profile) => void;
}

const WelcomeScreen = ({ profile, setProfile }: Props) => {
  const [showScreen, setShowScreen] = useState(0);
  const [emoji, setEmoji] = useState("");
  const [pseudonym, setPseudonym] = useState("");

  const handleEmojiClicked = (emoji: any) => {
    setEmoji(emoji.native);
  };

  const handleNextEmojiClick = () => {
    setProfile({ ...profile, emoji: emoji });
    setShowScreen(1);
  };

  const handleNextPseudonymClick = () => {
    if (pseudonym.length > 40) {
      setProfile({ ...profile, pseudonym: pseudonym.substring(0, 40) });
    } else {
      setProfile({ ...profile, pseudonym: pseudonym });
    }

    setShowScreen(2);
  };

  if (showScreen === 0) {
    return (
      <div style={{ display: "flex", flexDirection: "column", textAlign: "center", justifyContent: "center", alignItems: "center" }}>
        <Image src={"/static/logo.png"} width={75} height={50} alt={"LOGO"} />
        <h2>Witaj w Pssiappka 2024</h2>
        <p>Wybierz swoją ulubioną emotkę!</p>
        <Picker data={data} onEmojiSelect={handleEmojiClicked} />
        {emoji !== "" && (
          <button className="button-19" style={{ marginTop: "20px" }} role="button" onClick={handleNextEmojiClick}>
            Dalej
          </button>
        )}
      </div>
    );
  }

  if (showScreen === 1) {
    return (
      <div style={{ textAlign: "center" }}>
        <Image src={"/static/logo.png"} width={75} height={50} alt={"LOGO"} />
        <h2>Pssiappka 2024</h2>
        <p>Podaj swój pseudonim!</p>
        <input style={{ width: "200px" }} type="text" value={pseudonym} onChange={(e) => setPseudonym(e.target.value)} />
        {pseudonym !== "" && (
          <div>
            <button className="button-19" style={{ marginTop: "20px", width: "100px" }} role="button" onClick={handleNextPseudonymClick}>
              Dalej
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <h2>Witaj w Pssiappka 2024</h2>
    </div>
  );
};

export default WelcomeScreen;
