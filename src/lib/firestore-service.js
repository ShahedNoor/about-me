import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy,
  serverTimestamp 
} from "firebase/firestore";
import { db } from "./firebase";

// =========================================================================
// DEFAULT SEED DATA (Used for instant fallback and initial database seed)
// =========================================================================
export const DEFAULT_APPS = [
  {
    id: "ritualz",
    title: "Ritualz",
    verb: "Track",
    category: "Habit Tracker",
    number: "01",
    order: 1,
    desc: "Build consistent habits with streaks, gentle reminders, and a calm daily view.",
    color: "#F97316",
    iconType: "flame",
    posterUrl: "https://www.mitchkoko.app/roadto1k/ep3/posters/ritualz.png",
    websiteUrl: "https://ritualz.app",
    appStoreUrl: "https://apps.apple.com/app/ritualz/id6443862619",
    googlePlayUrl: "https://play.google.com/store/apps/details?id=app.shahednoor.ritualzandroid",
    published: true,
  },
  {
    id: "expensif",
    title: "Expensif",
    verb: "Budget",
    category: "Personal Finance",
    number: "02",
    order: 2,
    desc: "Track spending, set budgets, and see where your money actually goes each month.",
    color: "#10B981",
    iconType: "card",
    posterUrl: "https://www.mitchkoko.app/roadto1k/ep3/posters/expensif.png",
    websiteUrl: "https://expensif.app",
    appStoreUrl: "https://apps.apple.com/app/expense-tracker-expensif/id6756248515",
    googlePlayUrl: "https://play.google.com/store/apps/details?id=app.shahednoor.expensif",
    published: true,
  },
  {
    id: "tuteee",
    title: "Tuteee",
    verb: "Learn",
    category: "AI Tutor",
    number: "03",
    order: 3,
    desc: "An AI tutor that explains any subject in plain language, at your pace.",
    color: "#8B5CF6",
    iconType: "education",
    posterUrl: "https://www.mitchkoko.app/roadto1k/ep3/posters/tuteee.png",
    websiteUrl: "https://tuteee.app",
    appStoreUrl: "https://apps.apple.com/app/tuteee/id6745890396",
    googlePlayUrl: "https://play.google.com/store/apps/details?id=app.shahednoor.tuteee",
    published: true,
  },
  {
    id: "microwarz",
    title: "Micro Warz",
    verb: "Play",
    category: "Mobile Game",
    number: "04",
    order: 4,
    desc: "Fast-paced mobile game with quick matches and competitive leaderboards.",
    color: "#F43F5E",
    iconType: "gamepad",
    posterUrl: "https://www.mitchkoko.app/roadto1k/ep3/posters/microwarz.png",
    websiteUrl: "/microwarz",
    appStoreUrl: "https://apps.apple.com/app/micro-warz/id6759314141",
    googlePlayUrl: "https://play.google.com/store/apps/details?id=app.shahednoor.blinkbattle",
    published: true,
  },
];

// =========================================================================
// APPS CRUD OPERATIONS
// =========================================================================

/**
 * Fetch all apps from Firestore ordered by order index.
 * Falls back to DEFAULT_APPS if collection is currently empty.
 */
export async function getApps() {
  try {
    const q = query(collection(db, "apps"), orderBy("order", "asc"));
    const snap = await getDocs(q);
    if (snap.empty) {
      return DEFAULT_APPS;
    }
    return snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.warn("Error fetching apps from Firestore, using fallback defaults:", error);
    return DEFAULT_APPS;
  }
}

/**
 * Save or update an app by ID
 */
export async function saveApp(appData) {
  const { id, ...data } = appData;
  const docRef = id ? doc(db, "apps", id) : doc(collection(db, "apps"));
  const payload = {
    ...data,
    updatedAt: serverTimestamp(),
  };
  await setDoc(docRef, payload, { merge: true });
  return docRef.id;
}

/**
 * Delete an app from Firestore
 */
export async function deleteApp(id) {
  const docRef = doc(db, "apps", id);
  await deleteDoc(docRef);
}

/**
 * Seed initial apps data into Firestore
 */
export async function seedInitialApps() {
  for (const app of DEFAULT_APPS) {
    const { id, ...data } = app;
    await setDoc(doc(db, "apps", id), {
      ...data,
      updatedAt: serverTimestamp(),
    });
  }
}
