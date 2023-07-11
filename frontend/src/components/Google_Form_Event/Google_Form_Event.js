import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import "./Google_Form_Event.css";

const Google_Form_Event = () => {
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const successMessageRef = useRef(null);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();

  
    if (!summary || !description || !location || !startDateTime || !endDateTime) {
      alert("Please fill in all fields");
      return;
    }

   
    if (!isValidDateTime(startDateTime) || !isValidDateTime(endDateTime)) {
      alert("Please enter valid date and time");
      return;
    }

    
    setSubmitting(true);
    setSuccessMessage("");

   
    setTimeout(() => {
      axios
        .post("http://localhost:4000/api/create-events", {
          summary,
          description,
          location,
          startDateTime,
          endDateTime,
        })
        .then((response) => {
          setSuccessMessage("Event created successfully");
          setSubmitting(false);
          resetForm();
        })
        .catch((error) => {
          console.log(error.message);
        });
    }, 2000);
  };

  const resetForm = () => {
    setSummary("");
    setDescription("");
    setLocation("");
    setStartDateTime("");
    setEndDateTime("");
  };

  const isValidDateTime = (dateTime) => {
    const pattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
    return pattern.test(dateTime);
  };

  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");

  return (
    <div className="google-form-event">
      <h1 className="title">Create Event For Me</h1>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="summary">Event :</label>
          <input
            type="text"
            id="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            required
          />
        </div>

        <div className="input-container">
          <label htmlFor="description">Description :</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="input-container">
          <label htmlFor="location">Location :</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div className="input-container">
          <label htmlFor="startDateTime">Start Date Time :</label>
          <input
            type="datetime-local"
            id="startDateTime"
            value={startDateTime}
            onChange={(e) => setStartDateTime(e.target.value)}
            required
          />
        </div>

        <div className="input-container">
          <label htmlFor="endDateTime">End Date Time :</label>
          <input
            type="datetime-local"
            id="endDateTime"
            value={endDateTime}
            onChange={(e) => setEndDateTime(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="button" disabled={submitting}>
          {submitting ? "Creating Event..." : "Create Event"}
        </button>
      </form>

      {successMessage && (
        <div className="success-message-container">
          <p className="success-message" ref={successMessageRef}>
            {successMessage}
          </p>
        </div>
      )}
    </div>
  );
};

export default Google_Form_Event;
