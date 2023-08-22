import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  orderBy,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

// Firebase configuration (keep it as it is)
const firebaseConfig = {
  apiKey: "AIzaSyCtM_PPj1hmxD0vQBN_Dbmf1dz3s5FZ7KI",
  authDomain: "doces-380a0.firebaseapp.com",
  projectId: "doces-380a0",
  storageBucket: "doces-380a0.appspot.com",
  messagingSenderId: "389035551948",
  appId: "1:389035551948:web:fc325e0b258d93ebb8e669",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to render each entry as a new card in the 'entries' section
const renderEntryCard = (entryDataArray) => {
  // Sort the array by date in descending order (most recent on top)
  entryDataArray.sort((a, b) => new Date(a.order) - new Date(b.order));

  // Rendering each entry as a new card in the 'entries' section
  entryDataArray.forEach((entryData) => {
    const card = document.createElement("div");
    card.className = "card";

    const imageElement = document.createElement("div");
    imageElement.className = "card-img";

    // Check if entryData.image is empty
    const imageUrl = entryData.image
      ? entryData.image
      : "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c45f2463-bf29-439a-983d-b7ecb15282ea/dg3zwsg-255b989f-afe6-4b3d-9314-db929a9f6002.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2M0NWYyNDYzLWJmMjktNDM5YS05ODNkLWI3ZWNiMTUyODJlYVwvZGczendzZy0yNTViOTg5Zi1hZmU2LTRiM2QtOTMxNC1kYjkyOWE5ZjYwMDIuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.vP1p-luhySznk8MQz9ZcAmieLjPFfOT-BjQKzG8v7IU";

    imageElement.style.background = `url('${imageUrl}') 50% 50% no-repeat`;
    imageElement.style.backgroundSize = "cover";
    imageElement.style.width = "80px";
    imageElement.style.height = "80px";

    const titleElement = document.createElement("h2");
    titleElement.textContent = entryData.name;

    const birthDateElement = document.createElement("div");
    birthDateElement.className = "birthdate";

    const cakeElement = document.createElement("div");
    const cakeUrl =
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c45f2463-bf29-439a-983d-b7ecb15282ea/dg6jb4u-35debbbf-3f67-4853-9723-b71782026df4.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2M0NWYyNDYzLWJmMjktNDM5YS05ODNkLWI3ZWNiMTUyODJlYVwvZGc2amI0dS0zNWRlYmJiZi0zZjY3LTQ4NTMtOTcyMy1iNzE3ODIwMjZkZjQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.tJDMWQvTv2L-kqKpORrnqdOmGxL5tYNSEoNCQd5_X3o";

    cakeElement.style.background = `url('${cakeUrl}')`;
    cakeElement.style.backgroundSize = "cover";
    cakeElement.style.width = "16px";
    cakeElement.style.height = "16px";

    const dateElement = document.createElement("p");
    dateElement.textContent = entryData.birthdate;

    card.appendChild(birthDateElement);
    birthDateElement.appendChild(cakeElement);
    birthDateElement.appendChild(dateElement);

    card.appendChild(imageElement);
    card.appendChild(titleElement);

    document.querySelector(".entries").appendChild(card);
  });
};

// Function to fetch entries from Firestore and render them as cards
const fetchEntriesFromFirestore = async () => {
  try {
    const querySnapshot = await getDocs(
      collection(db, "team"),
      orderBy("order")
    );
    const entryDataArray = []; // Create an empty array to store entry data

    querySnapshot.forEach((doc) => {
      // Push each entry data (doc.data()) into the array
      entryDataArray.push(doc.data());
    });

    // Now you can call the renderEntryCard function with the array of entry data
    renderEntryCard(entryDataArray);
  } catch (error) {
    console.error("Error fetching entries: ", error);
  }
};

// Call the fetch function when the page loads
window.addEventListener("load", () => {
  fetchEntriesFromFirestore();
});
