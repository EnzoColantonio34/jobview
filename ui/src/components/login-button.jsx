import React from "react";
import "../styles/welcome-page/style-login-button.scss";

export default function LoginButton({ onClick }) {
  return (
    <button className="wv-login-button" onClick={onClick}>
      Se connecter
    </button>
  );
}
