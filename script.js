
// ---------- 1. Интерактивная лента «История дружбы» ----------
const episodes = [
  {
    title: "Настороженность",
    frame: "Кадр 1 · котёнок в коробке, взгляд исподлобья",
    note: "Первые встречи всегда на расстоянии. Художники долго искали именно этот взгляд — не злой, а испуганный."
  },
  {
    title: "Крышка от бутылки",
    frame: "Кадр 2 · маленькая крышка между двумя лапами",
    note: "Крышка — первый жест доверия. Маленький предмет, который становится мостом между двумя мирами."
  },
  {
    title: "Игра",
    frame: "Кадр 3 · котёнок и пёс в прыжке",
    note: "Игра — это язык, на котором не нужно слов. Аниматоры раскадровывали каждое движение по кадрам."
  },
  {
    title: "Гроза",
    frame: "Кадр 4 · тёмное небо, дождь, две фигуры под укрытием",
    note: "Самый страшный эпизод. Здесь становится ясно, что происходит за закрытыми дверями двора."
  },
  {
    title: "Спасение",
    frame: "Кадр 5 · котёнок зовёт на помощь",
    note: "Маленький герой делает то, на что не решался раньше, — действует. И это меняет всё."
  },
  {
    title: "Побег",
    frame: "Кадр 6 · две фигуры уходят в рассвет",
    note: "Финал не про то, куда они идут, а про то, что идут вместе. Дом — это не место."
  }
];

const panel = document.getElementById("timelinePanel");
const frameEl = document.getElementById("timelineFrame");
const titleEl = document.getElementById("timelineTitle");
const noteEl = document.getElementById("timelineNote");

document.querySelectorAll(".timeline-item").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".timeline-item").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const ep = episodes[Number(btn.dataset.ep)];
    frameEl.textContent = ep.frame;
    titleEl.textContent = ep.title;
    noteEl.textContent = ep.note;
  });
});

// ---------- 2. Галерея + лайтбокс ----------
const lightbox = document.getElementById("lightbox");
const lightboxContent = document.getElementById("lightboxContent");
const lightboxClose = document.getElementById("lightboxClose");

document.querySelectorAll(".gallery-item").forEach(item => {
  item.addEventListener("click", () => {
    lightboxContent.innerHTML =
      `<p style="font-size:1.2em;margin-top:0;">${item.textContent}</p>
       <p style="color:#5a5751;font-size:0.9em;">Здесь будет кадр или эскиз. Замените этот блок на &lt;img src="..."&gt; с реальным изображением.</p>`;
    lightbox.hidden = false;
  });
});

lightboxClose.addEventListener("click", () => { lightbox.hidden = true; });
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) lightbox.hidden = true;
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") lightbox.hidden = true;
});

// ---------- 3. Пасхалка: крышка от бутылки ----------
const cap = document.getElementById("bottleCap");
cap.addEventListener("click", () => {
  cap.classList.add("spin");
  setTimeout(() => cap.classList.remove("spin"), 800);
});

// ---------- 4. Появление секций при скролле ----------
const revealTargets = document.querySelectorAll(".section, .hero");
revealTargets.forEach(el => el.classList.add("reveal"));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealTargets.forEach(el => observer.observe(el));