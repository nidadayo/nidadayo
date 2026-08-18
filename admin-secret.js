/* =================================
   管理者ログイン
================================= */

const loginForm =
  document.getElementById("loginForm");

const loginEmail =
  document.getElementById("loginEmail");

const loginPassword =
  document.getElementById("loginPassword");

const loginButton =
  document.getElementById("loginButton");

const loginMessage =
  document.getElementById("loginMessage");


/* Supabase */

const SUPABASE_URL =
  "https://lsmghojbzokpbpsyymui.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_smmyqBSNwcWlVL4m_bFJRQ_8GFqYT73";


const supabaseClient =
  window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );


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

  loginForm.addEventListener(
    "submit",
    async (event) => {

      event.preventDefault();


      const email =
        loginEmail.value.trim();

      const password =
        loginPassword.value;


      loginButton.disabled = true;

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
            "ログインに失敗しました。";

          return;

        }


        if (data.session) {

          loginMessage.textContent =
            "ログイン成功！🎉";

          alert(
            "管理者ログインに成功しました！"
          );

        }


      } catch (error) {

        console.error(
          "ログインエラー:",
          error
        );

        loginMessage.textContent =
          "エラーが発生しました。";


      } finally {

        loginButton.disabled = false;

        loginButton.textContent =
          "ログイン";

      }

    }
  );

}
