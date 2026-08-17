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

const navLinks =
  document.querySelectorAll(".nav a");

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

const blogSearch =
  document.getElementById("blogSearch");

const blogList =
  document.getElementById("blogList");

const blogCount =
  document.getElementById("blogCount");

const noResults =
  document.getElementById("noResults");

const categories =
  document.querySelectorAll(".category");


/* ブログページにいる場合だけ実行 */

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
        item.dataset.title
          .toLowerCase();

      const category =
        item.dataset.category;


      /* キーワード検索 */

      const matchesKeyword =
        title.includes(keyword);


      /* カテゴリー検索 */

      const matchesCategory =
        currentCategory === "all" ||
        category === currentCategory;


      /* 両方に一致した記事だけ表示 */

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


    /* =================================
       件数表示
    ================================= */

    blogCount.textContent =
      `${visibleCount}件の記事`;


    /* =================================
       検索結果なし
    ================================= */

    if (visibleCount === 0) {

      noResults.style.display = "block";

    } else {

      noResults.style.display = "none";

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

        /* 現在のカテゴリーを変更 */

        currentCategory =
          categoryButton.dataset.category;


        /* activeを切り替え */

        categories.forEach((button) => {

          button.classList.remove("active");

        });

        categoryButton.classList.add("active");


        /* 記事を更新 */

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
   訪問者カウンター
================================= */

const visitorNumber =
  document.querySelector(".visitor-number");


if (visitorNumber && window.supabase) {

  const SUPABASE_URL =
    "https://lsmghojbzokpbpsyymui.supabase.co";

  const SUPABASE_KEY =
    "ここにSupabaseのPublishable key";


  const supabaseClient =
    window.supabase.createClient(
      SUPABASE_URL,
      SUPABASE_KEY
    );


  async function updateVisitorCount() {

    try {

      /* 訪問者数を +1 */

      const { data, error } =
        await supabaseClient.rpc(
          "increment_visitor_count"
        );


      if (error) {

        console.error(
          "訪問者カウンターエラー:",
          error
        );

        return;

      }


      /* 数字を表示 */

      if (data !== null) {

        visitorNumber.textContent =
          String(data).padStart(6, "0");

      }

    } catch (error) {

      console.error(
        "訪問者カウンターエラー:",
        error
      );

    }

  }


  updateVisitorCount();

}
