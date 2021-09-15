import { useState } from "react";

import Statistics from "./components/Statistics/Statistics";
import FeedbackOptions from "./components/FeedbackOptions/FeedbackOptions";
import Section from "./components/Section/Section";
import Notification from "./components/Notification/Notification";

import Wrap from "./App.styled";
import "./index.css";
import "./App.css";

export default function App() {
  const [goodRating, setGoodRating] = useState(0);
  const [neutralRating, setNeutralRating] = useState(0);
  const [badRating, setBadRating] = useState(0);
  const nameButtons = ["good", "neutral", "bad"];

  const changeFeedback = (name) => {
    switch (name) {
      case "good":
        setGoodRating((prevState) => prevState + 1);
        break;

      case "neutral":
        setNeutralRating((prevState) => prevState + 1);
        break;

      case "bad":
        setBadRating((prevState) => prevState + 1);
        break;

      default:
        return;
    }
  };

  const countTotalFeedback = () => goodRating + neutralRating + badRating;

  const countPositiveFeedbackPercentage = () => {
    const positiveFeedback = Number.parseInt(
      (goodRating * 100) / (goodRating + neutralRating + badRating)
    );
    return isNaN(positiveFeedback) ? 0 : `${positiveFeedback} %`;
  };

  return (
    <Wrap>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={nameButtons}
          onLeaveFeedback={changeFeedback}
        />
      </Section>
      <Section title="Statistics">
        {countTotalFeedback() === 0 ? (
          <Notification />
        ) : (
          <Statistics
            good={goodRating}
            neutral={neutralRating}
            bad={badRating}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        )}
      </Section>
    </Wrap>
  );
}
