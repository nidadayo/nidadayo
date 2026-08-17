/* =================================
   Supabase 接続
================================= */

const SUPABASE_URL = "https://lsmghojbzokpbpsyymui.supabase.co";

// Supabaseの「Publishable key」をここに貼る
const SUPABASE_KEY = "ここにPublishable key";

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

});/* =================================
   Supabase 接続テスト
================================= */

async function testSupabase() {

  const { data, error } = await supabaseClient
    .from("posts")
    .select("*")
    .limit(1);

  if (error) {

    console.error("Supabaseエラー:", error);
    return;

  }

  console.log("Supabase接続成功！");
  console.log("取得した記事:", data);

}

testSupabase();
