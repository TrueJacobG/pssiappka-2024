import { Profile } from "@/types/Profile";
import { Select } from "@/types/Select";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

interface Props {
  profile: Profile;
  select: Select[];
  currentSection: number;
}

const EndScreen = ({ profile, select, currentSection }: Props) => {
  const calculateResult = (select: Select[]) => {
    let userAnswers = select.map((item) => {
      return item.userAnswer;
    });

    let result: string = mostCommon(userAnswers);

    let possibleResults = [
      "AB",
      "AC",
      "AD",
      "AE",
      "BA",
      "BC",
      "BD",
      "BE",
      "CA",
      "CB",
      "CD",
      "CE",
      "DA",
      "DB",
      "DC",
      "DE",
      "EA",
      "EB",
      "EC",
      "ED",
    ];

    if (possibleResults.indexOf(result) === -1) {
      console.warn("unexpected result: ", result);
      return "DC";
    }

    return result;
  };

  const mostCommon = (array: string[]): string => {
    if (array.length == 0) {
      return "";
    }
    let map: { [key: string]: number } = {};

    for (let i = 0; i < array.length; i++) {
      let el = array[i];
      if (map[el] == null) {
        map[el] = 1;
      } else {
        map[el]++;
      }
    }

    let max = 0;
    let result = "";

    for (let key in map) {
      if (map[key] > max) {
        max = map[key];
        result = key;
      }
    }

    let newMax = 0;
    let result2 = "";
    for (let key in map) {
      if (map[key] > newMax && key !== result) {
        newMax = map[key];
        result2 = key;
      }
    }

    if (result2 === "") {
      result2 = getOtherLetter(result);
    }

    return `${result}${result2}`;
  };

  const getOtherLetter = (letter: string) => {
    if (letter === "E") {
      return "D";
    } else {
      return "E";
    }
  };

  const addToDB = async (group: string) => {
    if (profile !== null && profile.pseudonym !== null && profile.pseudonym !== "" && group !== null && group !== "") {
      let res = await fetch("https://pssiappka.pl/api/result", {
        method: "POST",
        body: JSON.stringify({
          pseudonym: profile.pseudonym,
          emoji: profile.emoji,
          group: group,
        }),
      });
      res = await res.json();
    }
  };

  useEffect(() => {
    if (currentSection > select.length - 1) {
      addToDB(calculateResult(select));
    }
  }, [currentSection, select]);

  return (
    <div style={{ textAlign: "center" }}>
      <Image src={"/static/logo.png"} width={150} height={100} alt={"LOGO"} />
      <h2>Pssiappka 2024</h2>
      <div>
        <Link
          href={{
            pathname: `/result/${calculateResult(select)}`,
            query: {
              pseudonym: profile.pseudonym,
              emoji: profile.emoji,
            },
          }}
        >
          <button className="button-19" style={{ width: "200px" }} role="button">
            Przejdź do wyników!
          </button>
        </Link>
      </div>
    </div>
  );
};

export default EndScreen;
