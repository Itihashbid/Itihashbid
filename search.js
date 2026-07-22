// search.js — এখন Firestore থেকে সরাসরি সব আর্টিকেল আনবে (হার্ডকোড লিস্ট আর নেই)

import { db } from "./firebase-config.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const searchInput = document.getElementById('searchInput');
const resultsBox = document.getElementById('searchResults');
const noResults = document.getElementById('noResults');

let articles = [];      // Firestore থেকে আসা সব আর্টিকেল এখানে জমা হবে
let articlesLoaded = false;

// পেজ লোড হওয়ার সাথে সাথেই একবার সব আর্টিকেল এনে রাখা হচ্ছে,
// যাতে প্রতিবার টাইপ করার সময় বারবার ডাটাবেসে না যেতে হয়
async function loadAllArticles(){
  try{
    const snapshot = await getDocs(collection(db, "articles"));
    articles = snapshot.docs.map(docSnap => ({
      id: docSnap.id,
      title: docSnap.data().title || "",
      desc: docSnap.data().desc || "",
      cat: docSnap.data().cat || "",
      badge: docSnap.data().badge || "",
      image: docSnap.data().image || ""
    }));
    articlesLoaded = true;
  } catch(err){
    resultsBox.innerHTML = "<p style='color:var(--slate); font-size:13.5px;'>লেখাগুলো লোড করতে সমস্যা হয়েছে।</p>";
  }
}

function renderResults(list){
  resultsBox.innerHTML = "";
  if(list.length === 0){
    noResults.style.display = "block";
    return;
  }
  noResults.style.display = "none";

  list.forEach(item => {
    const card = document.createElement('a');
    card.href = `read.html?id=${item.id}`;
    card.className = "card";
    card.style.textDecoration = "none";
    const imgStyle = item.image ? `style="background-image:url('${item.image}'); background-size:cover; background-position:center;"` : '';
    card.innerHTML = `
      <div class="card-img" ${imgStyle}><span class="card-badge">${item.badge}</span></div>
      <div class="card-body">
        <span class="cat">${item.cat}</span>
        <h3 class="headline">${item.title}</h3>
        <p>${item.desc}</p>
      </div>
    `;
    resultsBox.appendChild(card);
  });
}

searchInput.addEventListener('input', async () => {
  const q = searchInput.value.trim().toLowerCase();

  if(!articlesLoaded){
    await loadAllArticles();
  }

  if(q === ""){
    renderResults([]);
    noResults.style.display = "none";
    return;
  }

  const filtered = articles.filter(item =>
    item.title.toLowerCase().includes(q) ||
    item.desc.toLowerCase().includes(q) ||
    item.cat.toLowerCase().includes(q)
  );
  renderResults(filtered);
});

// পেজ খোলার সাথে সাথেই ব্যাকগ্রাউন্ডে লোড শুরু হয়ে যাবে
loadAllArticles();