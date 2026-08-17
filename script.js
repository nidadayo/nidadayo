/* =================================
   Supabase 接続
================================= */

const SUPABASE_URL = "https://lsmghojbzokpbpsyymui.supabase.co";

const SUPABASE_KEY = "sb_publishable_smmyqBSNwcWlVL4m_bFJRQ_8GFqYT73";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);


/* =================================
   ハンバーガーメニュー
================================= */

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

if (menuBtn && nav) {

  menuBtn.addEventListener("click", () => {

    menuBtn.classList.toggle("active");
    nav.classList.toggle("active");

  });

}


/* =================================
   メニューをクリックしたら閉じる
================================= */

const navLinks = document.querySelectorAll(".nav a");

navLinks.forEach((link) => {

  link.addEventListener("click", () => {

    if (menuBtn && nav) {

      menuBtn.classList.remove("active");
      nav.classList.remove("active");

    }

  });

});
