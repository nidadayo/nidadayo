/* =================================
   管理者ログイン
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

}


/* =================================
   要素取得
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


/* =================================
   秘密ワード
================================= */

const ADMIN_SECRET_WORD =
  "nida-admin";


/* =================================
   秘密ワード入力
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


      /* キャンセル */

      if (input === null) {
        return;
      }


      /* 秘密ワード確認 */

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
   Supabaseが読み込まれているか確認
================================= */

if (!adminSupabase) {

  console.error(
    "Supabaseが読み込まれていません。"
  );

}


/* =================================
   管理者ログイン
================================= */

if (
  loginForm &&
  loginEmail &&
  loginPassword &&
  loginButton &&
  loginMessage &&
  adminSupabase
) {

  loginForm.addEventListener(
    "submit",
    async (event) => {

      event.preventDefault();


      /* 入力内容 */

      const email =
        loginEmail.value.trim();

      const password =
        loginPassword.value;


      /* 空欄チェック */

      if (!email || !password) {

        loginMessage.textContent =
          "メールアドレスとパスワードを入力してください。";

        return;

      }


      /* ログイン中 */

      loginButton.disabled =
        true;

      loginButton.textContent =
        "ログイン中...";

      loginMessage.textContent =
        "";


      try {

        /* Supabase Auth */

        const { data, error } =
          await adminSupabase.auth
            .signInWithPassword({

              email: email,

              password: password

            });


        /* エラー */

        if (error) {

          console.error(
            "Supabaseログインエラー:",
            error
          );


          loginMessage.textContent =
            "ログインに失敗しました。";

          return;

        }


        /* ログイン成功 */

        if (data.session) {

          loginMessage.textContent =
            "ログイン成功！🎉";


          alert(
            "管理者ログインに成功しました！"
          );


          /*
             今後ここに
             管理画面への処理を追加できる
          */

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

}


/* =================================
   デバッグ
================================= */

console.log(
  "admin-secret.js 読み込み成功"
);

console.log(
  "秘密入口:",
  !!adminSecretButton
);

console.log(
  "ログインフォーム:",
  !!loginForm
);

console.log(
  "Supabase:",
  !!adminSupabase
);
