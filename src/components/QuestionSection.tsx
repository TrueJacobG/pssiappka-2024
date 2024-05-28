"use client";
import { Select } from "@/types/Select";
import Image from "next/image";
import { useState } from "react";
import "./QuestionSection.css";

interface Props {
  currentSection: number;
  setCurrentSection: (value: number) => void;
  select: Select[];
  setSelect: (value: Select[]) => void;
}

const QuestionSection = ({ currentSection, setCurrentSection, select, setSelect }: Props) => {
  const [checked, setChecked] = useState([false, false, false, false, false]);
  const [error, setError] = useState("");

  const handleClick = (answer: string) => {
    setError("");
    switch (answer) {
      case "A":
        setChecked([true, false, false, false, false]);
        break;
      case "B":
        setChecked([false, true, false, false, false]);
        break;
      case "C":
        setChecked([false, false, true, false, false]);
        break;
      case "D":
        setChecked([false, false, false, true, false]);
        break;
      case "E":
        setChecked([false, false, false, false, true]);
        break;
      default:
        break;
    }

    const newSelect = [...select];
    newSelect[currentSection].userAnswer = answer;
    setSelect([...newSelect]);
  };

  const handlePrevClick = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      setChecked([false, false, false, false, false]);
    }
  };

  const handleNextClick = () => {
    if (checked.every((item) => item === false)) {
      setError("Wybierz odpowiedź");
      return;
    }

    setCurrentSection(currentSection + 1);
    setChecked([false, false, false, false, false]);
  };

  return (
    <div>
      <div>
        <div style={{ textAlign: "center" }}>
          <Image src={"/static/logo.png"} width={75} height={50} alt={"LOGO"} />
          <h2>{select[currentSection].question}</h2>
        </div>

        <div>
          {["A", "B", "C", "D", "E"].map((item, i) => {
            return (
              <div className="checkbox-wrapper-2" key={i}>
                <input
                  type="checkbox"
                  className="sc-gJwTLC ikxBAC"
                  onClick={() => handleClick(item)}
                  checked={checked[i]}
                  onChange={() => {}}
                />
                <label className="label">{select[currentSection].answers[i]}</label>
              </div>
            );
          })}
        </div>

        <div className="buttons">
          <button className="button-19" role="button" onClick={handlePrevClick}>
            Poprzednie
          </button>
          <button className="button-19" role="button" onClick={handleNextClick}>
            Następne
          </button>
        </div>
        <div style={{ color: "red" }}>
          <p>{error}</p>
        </div>
      </div>
    </div>
  );
};

export default QuestionSection;
