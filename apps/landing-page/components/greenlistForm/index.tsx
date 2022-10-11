import axios from "axios";
import classNames from "classnames";
import { ethers } from "ethers";
import { useState, useEffect, FormEvent } from "react";

import ZodiacTop from "../zodiacHalves/Top";
import ZodiacBottom from "../zodiacHalves/Bottom";
import styles from "./greenlistForm.module.css";
import classnames from "classnames";

const GreenlistForm = () => {
  const [phrase, setPhrase] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [phraseError, setPhraseError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getPhraseFromParams();
  }, []);

  const getPhraseFromParams = () => {
    const url = location.search;
    const params = new URLSearchParams(url);
    const phrase = params.get("incantation");
    if (phrase) {
      setPhrase(phrase);
    }
  };

  const validateAddress = (addressToCheck: string): Boolean => {
    if (addressToCheck.includes(".eth")) {
      return true;
    }
    const isValid = ethers.utils.isAddress(addressToCheck);
    setAddressError(!isValid);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setSuccess(false);
    setError("");
    const validAddress = validateAddress(address);
    if (validAddress) {
      try {
        const res = await axios.post("/api/greenlist", {
          phrase,
          address,
          email,
        });
        setSuccess(true);
      } catch (error: any) {
        console.log(error);
        setProcessing(false);
        if (error.response.status == 404) {
          setError("Not a valid incantation");
        } else if (error.response.status == 409) {
          setError("Incantation already claimed");
        } else {
          setError(error.message);
        }
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.zodiacTopHalfContainer}>
        <ZodiacTop />
      </div>
      <div className={styles.intro}>
        <p>
          Zodiac Wands are launching soon. Protect the card you've been given.
        </p>
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

export default GreenlistForm;
