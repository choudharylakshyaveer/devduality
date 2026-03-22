import { db } from "../firebase";
import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";

/* ─────────────────────────────────────────────────────────────────────────────
   visitTracker.js
   Writes to Firestore:  visits/stats  →  { totalVisits }

   Unique visitor detection: stores a UUID in localStorage.
   If no UUID exists for this browser, the visitor is counted as new (unique).
   Total is incremented on every page load regardless.
───────────────────────────────────────────────────────────────────────────── */

const STATS_REF = () => doc(db, "visits", "stats");


/**
 * Call once when the portfolio mounts.
 * Atomically increments totalVisits (always).
 */
export async function trackVisit() {
  try {
    const ref       = STATS_REF();
    const snap      = await getDoc(ref);

    if (!snap.exists()) {
      // First ever visit — create the document
      await setDoc(ref, {
        totalVisits:  1,
      });
    } else {
      await updateDoc(ref, {
        totalVisits:  increment(1),
      });
    }
  } catch (err) {
    // Never crash the portfolio over a tracking error
    console.warn("Visit tracking failed:", err.message);
  }
}

/**
 * Fetch current visit stats for the admin dashboard.
 * Returns { totalVisits } or null on error.
 */
export async function fetchVisitStats() {
  try {
    const snap = await getDoc(STATS_REF());
    if (!snap.exists()) return { totalVisits: 0 };
    return snap.data();
  } catch (err) {
    console.warn("Could not fetch visit stats:", err.message);
    return null;
  }
}