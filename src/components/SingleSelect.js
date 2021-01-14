import React, { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Button,
} from "reactstrap";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { surveySlice } from "../store/surveySlice";

export default function SingleSelect() {
  const [options, setOptions] = useState(["", ""]);
  const [question, setQuestion] = useState("");
  const { surveyId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const setOptionInArray = (value, idx) => {
    options[idx] = value;
    setOptions([...options]);
  };

  const checkEmpty = () =>
    question.trim() === "" ||
    options.find((opt) => opt.trim() === "") !== undefined;

  const addQuestionClickAction = () => {
    const payload = {
      options,
      question,
      surveyId,
      type: "single",
    };
    dispatch(surveySlice.actions.addQuestion(payload));
    history.push("/create/" + surveyId + "?clear=true");
  };

  const publishQuestion = () => {
    const payload = {
      options,
      question,
      surveyId,
      type: "single",
    };
    dispatch(surveySlice.actions.addQuestion(payload));
    history.push("/confirm/" + surveyId);
  };
  return (
    <div className="w-50" style={{ maxWidth: "400px" }}>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>?</InputGroupText>
        </InputGroupAddon>
        <Input
          placeholder="Your Question"
          onChange={(e) => setQuestion(e.target.value)}
          value={question}
        />
      </InputGroup>
      <p className="options-para">Options</p>
      <InputGroup className="mb-2">
        <Input
          placeholder="Option 1"
          onChange={(e) => setOptionInArray(e.target.value, 0)}
          value={options[0]}
        />
        <InputGroupAddon addonType="append">
          <InputGroupText>+</InputGroupText>
          <InputGroupText>-</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup className="mb-3">
        <Input
          placeholder="Option 2"
          onChange={(e) => setOptionInArray(e.target.value, 1)}
          value={options[1]}
        />
        <InputGroupAddon addonType="append">
          <InputGroupText>+</InputGroupText>
          <InputGroupText>-</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <div className="d-flex">
        <Button
          className="survey-main-button"
          disabled={checkEmpty()}
          onClick={addQuestionClickAction}
        >
          Add Question
        </Button>
        <Button
          className="survey-main-button"
          disabled={checkEmpty()}
          onClick={publishQuestion}
        >
          Publish
        </Button>
      </div>
    </div>
  );
}
