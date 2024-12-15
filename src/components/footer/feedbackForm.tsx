"use client";
import { postFeedBack } from "@/lib/db/action";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";

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

  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    if (openForm)
      window.document.getElementById("submit-form")?.scrollIntoView();
  }, [openForm]);
  if (successSubmit) {
    return <h2 className="text-white">Thanks for submitting feedback!</h2>;
  }
  return (
    <div
      data-state={openForm ? "opened" : "closed"}
      className="hidden w-[300px] rounded-md bg-secondary px-3 py-2 text-white transition-all duration-300 data-[state=opened]:w-[500px] md:block"
    >
      <div
        onClick={() => {
          setOpenForm(!openForm);
        }}
        className="flex cursor-pointer justify-between"
      >
        <h3 className=" text-gray-100">Send Feedback</h3>
        <ChevronDown
          className=" transition-transform data-[state=opened]:rotate-180"
          data-state={openForm ? "opened" : "closed"}
        />
      </div>
      {openForm && (
        <form
          id="submit-form"
          className="py-2 text-white"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <div>
            <div className="pb-1">
              <label className="text-gray-300" htmlFor="feedback">
                Feedback
              </label>
            </div>
            <textarea
              className="w-full rounded-md border border-secondary-100 bg-secondary-400 p-1  text-white"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              id="feedback"
              name="feedback"
            />
          </div>
          <div className="py-2">
            <Button aria-label="Submit" className="w-full py-2">
              Submit
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
