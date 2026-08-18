const adminSecretButton =
  document.getElementById(
    "adminSecretButton"
  );

const adminLogin =
  document.getElementById(
    "adminLogin"
  );


const secretWord =
  "nida-admin";


if (
  adminSecretButton &&
  adminLogin
) {

  adminSecretButton.addEventListener(
    "click",
    () => {

      const word =
        prompt(
          "秘密ワードを入力してください"
        );


      if (
        word === secretWord
      ) {

        adminLogin.style.display =
          "block";

      } else if (
        word !== null
      ) {

        alert(
          "秘密ワードが違います。"
        );

      }

    }
  );

}
