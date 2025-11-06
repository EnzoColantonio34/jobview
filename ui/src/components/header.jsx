import LoginButton from "./login-button";
import "../styles/welcome-page/style-header.scss";

export default function Header() {
  const handleLogin = () => {
    alert("Login clicked");
  };

  return (
    <header className="wv-header">
      <div className="wv-header__brand">
        Jobview
      </div>

      <div className="wv-header__actions">
        <LoginButton onClick={handleLogin} />
      </div>
    </header>
  );
}
