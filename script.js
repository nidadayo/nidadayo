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
/* =================================
   ブログ検索
================================= */

const blogSearch = document.getElementById("blogSearch");
const blogList = document.getElementById("blogList");
const blogCount = document.getElementById("blogCount");
const noResults = document.getElementById("noResults");

const categories =
  document.querySelectorAll(".category");


if (
  blogSearch &&
  blogList &&
  blogCount &&
  noResults
) {

  const blogItems =
    blogList.querySelectorAll(".blog-item");


  let currentCategory = "all";


  /* =================================
     ブログを絞り込む
  ================================= */

  function filterBlogs() {

    const keyword =
      blogSearch.value
        .trim()
        .toLowerCase();


    let visibleCount = 0;


    blogItems.forEach((item) => {

      const title =
        (item.dataset.title || "")
          .toLowerCase();


      const category =
        item.dataset.category || "";


      const matchesKeyword =
        title.includes(keyword);


      const matchesCategory =
        currentCategory === "all" ||
        category === currentCategory;


      if (
        matchesKeyword &&
        matchesCategory
      ) {

        item.style.display = "";

        visibleCount++;

      } else {

        item.style.display = "none";

      }

    });


    /* 件数表示 */

    blogCount.textContent =
      `${visibleCount}件の記事`;


    /* 検索結果なし */

    if (visibleCount === 0) {

      noResults.style.display =
        "block";

    } else {

      noResults.style.display =
        "none";

    }

  }


  /* =================================
     検索入力
  ================================= */

  blogSearch.addEventListener(
    "input",
    filterBlogs
  );


  /* =================================
     カテゴリー
  ================================= */

  categories.forEach((categoryButton) => {

    categoryButton.addEventListener(
      "click",
      () => {

        currentCategory =
          categoryButton.dataset.category;


        categories.forEach((button) => {

          button.classList.remove("active");

        });


        categoryButton.classList.add("active");


        filterBlogs();

      }
    );

  });


  /* =================================
     初期表示
  ================================= */

  filterBlogs();

}
/* =================================
   Supabase 接続
================================= */

const SUPABASE_URL =
  "https://lsmghojbzokpbpsyymui.supabase.co";

const SUPABASE_KEY =
  "こsb_publishable_smmyqBSNwcWlVL4m_bFJRQ_8GFqYT73";


let supabaseClient = null;


if (window.supabase) {

  supabaseClient =
    window.supabase.createClient(
      SUPABASE_URL,
      SUPABASE_KEY
    );

}
