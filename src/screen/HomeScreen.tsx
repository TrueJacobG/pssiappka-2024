"use client";

import QuestionSection from "@/components/QuestionSection";
import { Profile } from "@/types/Profile";
import { Select } from "@/types/Select";
import { useState } from "react";
import EndScreen from "./EndScreen";
import WelcomeScreen from "./WelcomeScreen";

const HomeScreen = () => {
  const [profile, setProfile] = useState<Profile>({
    pseudonym: "",
    emoji: "",
  });

  const [select, setSelect] = useState<Select[]>([
    {
      question: "Example question",
      answers: [" A) ", " B) ", " C) ", " D) ", " E) "],
      userAnswer: "",
    },
  ]);

  const [currentSection, setCurrentSection] = useState(0);

  if (new Date("2025-05-15") < new Date()) {
    return <h1>Spóźniłeś się! Dane zbierane były do 15.05.2025</h1>;
  }

  if (profile.pseudonym === "" || profile.emoji === "") {
    return <WelcomeScreen profile={profile} setProfile={setProfile} />;
  }

  return (
    <div>
      {currentSection > select.length - 1 ? (
        <EndScreen profile={profile} select={select} currentSection={currentSection} />
      ) : (
        <QuestionSection currentSection={currentSection} setCurrentSection={setCurrentSection} select={select} setSelect={setSelect} />
      )}
    </div>
  );
};

export default HomeScreen;
