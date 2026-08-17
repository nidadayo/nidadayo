/* =================================
   ハンバーガーメニュー
================================= */

const menuBtn = document.getElementById("menuBtn");

const nav = document.getElementById("nav");


menuBtn.addEventListener("click", () => {

  menuBtn.classList.toggle("active");

  nav.classList.toggle("active");

});



/* =================================
   メニューをクリックしたら閉じる
================================= */

const navLinks =
  document.querySelectorAll(".nav a");


navLinks.forEach((link) => {

  link.addEventListener("click", () => {

    menuBtn.classList.remove("active");

    nav.classList.remove("active");

  });

});
