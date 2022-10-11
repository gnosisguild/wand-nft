import axios from "axios";
import classNames from "classnames";
import { ethers } from "ethers";
import { useState, useEffect, FormEvent } from "react";

import ZodiacTop from "../zodiacHalves/Top";
import ZodiacBottom from "../zodiacHalves/Bottom";
import styles from "./emailForm.module.css";

const EmailForm = () => {
  const [email, setEmail] = useState("");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setSuccess(false);
    setError("");
    try {
      const res = await axios.post("/api/email", {
        email,
      });
      setSuccess(true);
    } catch (error: any) {
      console.log(error);
      setProcessing(false);
      setError(error.message);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.zodiacTopHalfContainer}>
        <ZodiacTop />
      </div>
      <div className={styles.intro}>
        <p>Zodiac Wands are launching soon.</p>
        <p>If you've been given a card, protect it! </p>
        <p>You'll need it to mint :)</p>
      </div>
      <div className={styles.formItem}>
        <div className={styles.formItemContent}>
          <label>Email for updates</label>
          <div className="inputContainer">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. gnoma@zodiac.wiki"
            />
          </div>
        </div>
      </div>
      {error && <div className={styles.error}>{error}</div>}
      {!success && (
        <div className="buttonContainer">
          <button type="submit" className="button" disabled={processing}>
            {processing ? "Processing..." : "Get Updates"}
          </button>
        </div>
      )}
      {success && <div className={styles.success}>Email added</div>}
      <div className={styles.zodiacBottomHalfContainer}>
        <ZodiacBottom />
      </div>
    </form>
  );
};

export default EmailForm;
