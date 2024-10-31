"use client";
import { postFeedBack } from "@/lib/db/actions";
import React, { useState } from "react";
import { Button } from "../ui/button";

export default function FeedBackForm() {
  const [feedback, setFeedback] = useState("");
  const [successSubmit, setSucessSubmit] = useState(false);
  const submit = () => {
    postFeedBack({ feedback })
      .then((e) => {
        if (e) {
          setSucessSubmit(true);
        }
      })
      .catch((e) => console.log(e));
  };
  if (successSubmit) {
    return <h2>Thanks for submitting feedback!</h2>;
  }
  return (
    <form
      className="rounded-md bg-secondary p-2 text-white"
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <h1>Send Feedback</h1>
      <div>
        <div>
          <label htmlFor="feedback">Feedback</label>
        </div>
        <input
          type="text"
          className="text-black"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          id="feedback"
          name="feedback"
        />
      </div>
      <div className="py-2">
        <Button aria-label="Submit" variant={"modal"}>
          Submit
        </Button>
      </div>
    </form>
  );
}
