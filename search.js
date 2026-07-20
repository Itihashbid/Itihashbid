// সব আর্টিকেলের তথ্য এখানে রাখা আছে
const articles = [
  {
    title: "মহাস্থানগড়ে খননে মিলল নতুন প্রত্নসামগ্রী",
    desc: "প্রাচীন পুণ্ড্রনগরের ধ্বংসাবশেষে প্রত্নতাত্ত্বিকরা খুঁজে পেয়েছেন মৌর্য যুগের মুদ্রা ও শিলালিপি।",
    cat: "প্রত্নতত্ত্ব",
    badge: "প্রাচীন সভ্যতা",
    url: "article.html"
  },
  {
    title: "মেসোপটেমিয়া: লেখার প্রথম উদ্ভাবনের গল্প",
    desc: "কিউনিফর্ম লিপির উৎপত্তি ও সুমেরীয় সভ্যতার প্রশাসনিক ব্যবস্থা নিয়ে বিস্তারিত বিশ্লেষণ।",
    cat: "সভ্যতা",
    badge: "বিশ্ব ইতিহাস",
    url: "article-2.html"
  },
  {
    title: "বাংলার মসলিন বাণিজ্য কীভাবে ধ্বংস হলো",
    desc: "ইস্ট ইন্ডিয়া কোম্পানির নীতি কীভাবে বাংলার বস্ত্রশিল্পকে পঙ্গু করে দিয়েছিল, তার পূর্ণাঙ্গ বিবরণ।",
    cat: "অর্থনীতি",
    badge: "ঔপনিবেশিক কাল",
    url: "article-3.html"
  },
  {
    title: "সুবাহ বাংলা: এক সমৃদ্ধ প্রদেশের উত্থান",
    desc: "ঢাকা প্রতিষ্ঠা থেকে শুরু করে বাংলার প্রশাসনিক কাঠামোর বিবর্তন নিয়ে বিশ্লেষণ।",
    cat: "শাসনব্যবস্থা",
    badge: "মধ্যযুগ",
    url: "article-4.html"
  }
];

const searchInput = document.getElementById('searchInput');
const resultsBox = document.getElementById('searchResults');
const noResults = document.getElementById('noResults');

function renderResults(list){
  resultsBox.innerHTML = "";
  if(list.length === 0){
    noResults.style.display = "block";
    return;
  }
  noResults.style.display = "none";

  list.forEach(item => {
    const card = document.createElement('a');
    card.href = item.url;
    card.className = "card";
    card.style.textDecoration = "none";
    card.innerHTML = `
      <div class="card-img"><span class="card-badge">${item.badge}</span></div>
      <div class="card-body">
        <span class="cat">${item.cat}</span>
        <h3 class="headline">${item.title}</h3>
        <p>${item.desc}</p>
      </div>
    `;
    resultsBox.appendChild(card);
  });
}

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();
  if(query === ""){
    renderResults([]);
    noResults.style.display = "none";
    return;
  }
  const filtered = articles.filter(item =>
    item.title.toLowerCase().includes(query) ||
    item.desc.toLowerCase().includes(query) ||
    item.cat.toLowerCase().includes(query)
  );
  renderResults(filtered);
});