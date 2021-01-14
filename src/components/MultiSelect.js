import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Button,
} from "reactstrap";
import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { surveySlice } from "../store/surveySlice";

export default function MultiSelect() {
  const [options, setOptions] = useState([""]);
  const [question, setQuestion] = useState("");
  const { surveyId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const addQuestionClickAction = () => {
    const payload = {
      options,
      question,
      surveyId,
      type: "multiple",
    };
    dispatch(surveySlice.actions.addQuestion(payload));
    history.push("/create/" + surveyId + "?clear=true");
  };

  const addOption = (idx) => {
    options.splice(idx + 1, 0, "");
    setOptions([...options]);
  };

  const removeOption = (idx) => {
    options.splice(idx, 1);
    setOptions([...options]);
  };

  const setOptionInArray = (value, idx) => {
    options[idx] = value;
    setOptions([...options]);
  };

  const checkEmpty = () =>
    question.trim() === "" ||
    options.find((opt) => opt.trim() === "") !== undefined;

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
      {options.map((opt, idx) => (
        <InputGroup className="mb-2" key={idx}>
          <Input
            placeholder={`Option ${idx + 1}`}
            onChange={(e) => setOptionInArray(e.target.value, idx)}
            value={opt}
          />
          <InputGroupAddon addonType="append">
            <Button
              onClick={() => addOption(idx)}
              disabled={options.length === 4}
            >
              +
            </Button>
            <Button
              onClick={() => removeOption(idx)}
              disabled={options.length === 1}
            >
              -
            </Button>
          </InputGroupAddon>
        </InputGroup>
      ))}
      {options.length === 4 ? (
        <div className="d-flex">
          <Button
            className="survey-main-button"
            disabled={checkEmpty()}
            onClick={addQuestionClickAction}
          >
            Add Question
          </Button>
          <Button className="survey-main-button" disabled={checkEmpty()}>
            Publish
          </Button>
        </div>
      ) : null}
    </div>
  );
}
