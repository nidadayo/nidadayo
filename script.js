/* =================================
   ハンバーガーメニュー
================================= */

const menuBtn =
  document.getElementById("menuBtn");

const nav =
  document.getElementById("nav");


if (menuBtn && nav) {

  menuBtn.addEventListener(
    "click",
    () => {

      menuBtn.classList.toggle("active");

      nav.classList.toggle("active");

    }
  );

}


/* =================================
   メニューをクリックしたら閉じる
================================= */

const navLinks =
  document.querySelectorAll(".nav a");


navLinks.forEach((link) => {

  link.addEventListener(
    "click",
    () => {

      if (menuBtn && nav) {

        menuBtn.classList.remove("active");

        nav.classList.remove("active");

      }

    }
  );

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


if (
  blogSearch &&
  blogList &&
  blogCount &&
  noResults
) {

  const blogItems =
    blogList.querySelectorAll(".blog-item");


  let currentCategory = "all";


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


    blogCount.textContent =
      `${visibleCount}件の記事`;


    if (visibleCount === 0) {

      noResults.style.display =
        "block";

    } else {

      noResults.style.display =
        "none";

    }

  }


  blogSearch.addEventListener(
    "input",
    filterBlogs
  );


  categories.forEach(
    (categoryButton) => {

      categoryButton.addEventListener(
        "click",
        () => {

          currentCategory =
            categoryButton.dataset.category;


          categories.forEach(
            (button) => {

              button.classList.remove(
                "active"
              );

            }
          );


          categoryButton.classList.add(
            "active"
          );


          filterBlogs();

        }
      );

    }
  );


  filterBlogs();

}


/* =================================
   Supabase
================================= */

const SUPABASE_URL =
  "https://lsmghojbzokpbpsyymui.supabase.co";


const SUPABASE_KEY =
  "sb_publishable_smmyqBSNwcWlVL4m_bFJRQ_8GFqYT73";


let supabaseClient = null;


if (window.supabase) {

  supabaseClient =
    window.supabase.createClient(
      SUPABASE_URL,
      SUPABASE_KEY
    );

}


/* =================================
   訪問者カウンター
================================= */

const visitorNumber =
  document.querySelector(
    ".visitor-number"
  );


if (
  visitorNumber &&
  supabaseClient
) {

  async function updateVisitorCount() {

    try {

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


      if (data !== null) {

        visitorNumber.textContent =
          String(data).padStart(
            6,
            "0"
          );

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


/* =================================
   質問箱
================================= */

const questionInput =
  document.getElementById(
    "questionInput"
  );

const questionButton =
  document.getElementById(
    "questionButton"
  );


if (
  questionInput &&
  questionButton &&
  supabaseClient
) {

  questionButton.addEventListener(
    "click",
    async () => {

      const question =
        questionInput.value.trim();


      if (!question) {

        alert(
          "質問を入力してね！"
        );

        return;

      }


      questionButton.disabled =
        true;

      questionButton.textContent =
        "送信中...";


      try {

        const { error } =
          await supabaseClient
            .from("questions")
            .insert({
              question: question
            });


        if (error) {

          console.error(
            "質問送信エラー:",
            error
          );

          alert(
            "送信に失敗しました。\nもう一度試してみてね。"
          );

          return;

        }


        questionInput.value = "";

        alert(
          "質問を送信しました！🎉"
        );


      } catch (error) {

        console.error(
          "質問送信エラー:",
          error
        );

        alert(
          "送信に失敗しました。\nもう一度試してみてね。"
        );


      } finally {

        questionButton.disabled =
          false;

        questionButton.textContent =
          "送信する";

      }

    }
  );

}


/* =================================
   管理者ログインフォーム
   秘密ワードで表示
================================= */

const adminLogin =
  document.getElementById(
    "adminLogin"
  );


/*
   ブログページの検索欄がある場合
*/

if (
  adminLogin &&
  blogSearch
) {

  blogSearch.addEventListener(
    "input",
    () => {

      const keyword =
        blogSearch.value
          .trim()
          .toLowerCase();


      if (
        keyword === "nida-admin"
      ) {

        adminLogin.style.display =
          "block";

      }

    }
  );

}


/* =================================
   管理者ログイン
================================= */

const loginForm =
  document.getElementById(
    "loginForm"
  );

const loginEmail =
  document.getElementById(
    "loginEmail"
  );

const loginPassword =
  document.getElementById(
    "loginPassword"
  );

const loginButton =
  document.getElementById(
    "loginButton"
  );

const loginMessage =
  document.getElementById(
    "loginMessage"
  );


if (
  loginForm &&
  loginEmail &&
  loginPassword &&
  loginButton &&
  loginMessage &&
  supabaseClient
) {

  loginForm.addEventListener(
    "submit",
    async (event) => {

      event.preventDefault();


      const email =
        loginEmail.value.trim();


      const password =
        loginPassword.value;


      loginButton.disabled =
        true;


      loginButton.textContent =
        "ログイン中...";


      loginMessage.textContent =
        "";


      try {

        const { data, error } =
          await supabaseClient.auth
            .signInWithPassword({
              email: email,
              password: password
            });


        if (error) {

          console.error(
            "ログインエラー:",
            error
          );


          loginMessage.textContent =
            "メールアドレスまたはパスワードが違います。";


          return;

        }


        if (data.session) {

          loginMessage.textContent =
            "ログインしました！";


          /*
             ログイン成功後
             ここではまだ移動しない
          */

        }


      } catch (error) {

        console.error(
          "ログインエラー:",
          error
        );


        loginMessage.textContent =
          "ログインに失敗しました。";


      } finally {

        loginButton.disabled =
          false;


        loginButton.textContent =
          "ログイン";

      }

    }
  );

}


/* =================================
   スマホのダークモード
================================= */

const prefersDark =
  window.matchMedia(
    "(prefers-color-scheme: dark)"
  );


function updateTheme() {

  if (
    prefersDark.matches
  ) {

    document.body.classList.add(
      "dark"
    );

  } else {

    document.body.classList.remove(
      "dark"
    );

  }

}


updateTheme();


prefersDark.addEventListener(
  "change",
  updateTheme
);

/* =================================
   秘密ワードで管理者ログインを表示
================================= */

const adminLogin =
  document.getElementById("adminLogin");

const secretWord =
  "nida-admin";


if (adminLogin) {

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Enter"
      ) {

        const word =
          prompt("秘密ワードを入力してください");


        if (
          word === secretWord
        ) {

          adminLogin.style.display =
            "block";

        }

      }

    }
  );

}
