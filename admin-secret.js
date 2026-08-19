document.addEventListener("DOMContentLoaded", () => {
const testButton =
  document.getElementById("testButton");

if (testButton) {

  testButton.addEventListener(
    "click",
    () => {
      alert("TESTボタン動いた！");
    }
  );

}
/* =================================
   管理者機能
   admin-secret.js
================================= */


/* =================================
   Supabase設定
================================= */

const ADMIN_SUPABASE_URL =
  "https://lsmghojbzokpbpsyymui.supabase.co";

const ADMIN_SUPABASE_KEY =
  "sb_publishable_smmyqBSNwcWlVL4m_bFJRQ_8GFqYT73";


/* =================================
   Supabase初期化
================================= */

let adminSupabase = null;

if (window.supabase) {

  adminSupabase =
    window.supabase.createClient(
      ADMIN_SUPABASE_URL,
      ADMIN_SUPABASE_KEY
    );

  console.log("Supabase初期化成功");

} else {

  console.error(
    "Supabaseが読み込まれていません。"
  );

}


/* =================================
   HTML要素
================================= */

const adminSecretButton =
  document.getElementById(
    "adminSecretButton"
  );

const adminLogin =
  document.getElementById(
    "adminLogin"
  );

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

const adminPanel =
  document.getElementById(
    "adminPanel"
  );

const adminStatus =
  document.getElementById(
    "adminStatus"
  );

const questionList =
  document.getElementById(
    "questionList"
  );


/* =================================
   秘密ワード
================================= */

const ADMIN_SECRET_WORD =
  "nida-admin";


/* =================================
   秘密ワード
================================= */

if (
  adminSecretButton &&
  adminLogin
) {

  adminSecretButton.addEventListener(
    "click",
    () => {

      const input =
        prompt(
          "秘密ワードを入力してください"
        );


      if (input === null) {
        return;
      }


      if (
        input === ADMIN_SECRET_WORD
      ) {

        adminLogin.style.display =
          "block";

        adminLogin.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });

      } else {

        alert(
          "秘密ワードが違います。"
        );

      }

    }
  );

}


/* =================================
   質問取得
================================= */

async function loadQuestions() {

  if (!adminSupabase) {

    console.error(
      "Supabaseがありません。"
    );

    return;

  }


  if (!questionList) {

    console.error(
      "questionListが見つかりません。"
    );

    return;

  }


  if (adminStatus) {

    adminStatus.textContent =
      "質問を読み込んでいます...";

  }


  questionList.innerHTML = "";


  try {

    const {
      data,
      error
    } =
      await adminSupabase
        .from("questions")
        .select("*")
        .order(
          "created_at",
          {
            ascending: false
          }
        );


    if (error) {

      console.error(
        "質問取得エラー:",
        error
      );


      if (adminStatus) {

        adminStatus.textContent =
          "質問を取得できませんでした。";

      }

      return;

    }


    console.log(
      "取得した質問:",
      data
    );


    if (
      !data ||
      data.length === 0
    ) {

      if (adminStatus) {

        adminStatus.textContent =
          "まだ質問はありません。";

      }

      return;

    }


    if (adminStatus) {

      adminStatus.textContent =
        `${data.length}件の質問があります。`;

    }


    data.forEach(
      (question) => {

        const questionBox =
          document.createElement(
            "div"
          );

        questionBox.className =
          "admin-question";


        const questionText =
          document.createElement(
            "p"
          );

        questionText.className =
          "admin-question-text";


        questionText.textContent =
          question.question;


        questionBox.appendChild(
          questionText
        );


        if (
          question.created_at
        ) {

          const date =
            document.createElement(
              "small"
            );

          date.className =
            "admin-question-date";


          date.textContent =
            new Date(
              question.created_at
            ).toLocaleString(
              "ja-JP"
            );


          questionBox.appendChild(
            date
          );

        }


        questionList.appendChild(
          questionBox
        );

      }
    );


  } catch (error) {

    console.error(
      "質問取得中にエラー:",
      error
    );


    if (adminStatus) {

      adminStatus.textContent =
        "質問取得中にエラーが発生しました。";

    }

  }

}


/* =================================
   ログイン
================================= */

if (
  loginForm &&
  loginEmail &&
  loginPassword &&
  loginButton &&
  loginMessage
) {

  loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    alert("ログインボタンの処理が動いた！！！");

  });

}


          /* 質問を取得 */

          await loadQuestions();

        }

      } catch (error) {

        console.error(
          "ログイン処理エラー:",
          error
        );


        loginMessage.textContent =
          "ログイン中にエラーが発生しました。";

      } finally {

        loginButton.disabled =
          false;

        loginButton.textContent =
          "ログイン";

      }

    }
  );

} else {

  console.error(
    "ログインフォームの要素が見つかりません。"
  );

}


/* =================================
   起動確認
================================= */

console.log(
  "admin-secret.js 起動完了"
);

                          });

alert(
  "loginForm = " +
  !!document.getElementById("loginForm") +
  "\nloginEmail = " +
  !!document.getElementById("loginEmail") +
  "\nloginPassword = " +
  !!document.getElementById("loginPassword") +
  "\nloginButton = " +
  !!document.getElementById("loginButton") +
  "\nloginMessage = " +
  !!document.getElementById("loginMessage")
);
