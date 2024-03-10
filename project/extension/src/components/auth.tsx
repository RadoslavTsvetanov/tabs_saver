import { useState } from "react";
interface Props {
  onSubmit: (email: string | undefined, username: string) => Promise<void>;
  changePage: () => void;
}

export const SignUpForm: React.FC<Props> = ({ onSubmit, changePage }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, username);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Sign Up</button>
      <button
        onClick={() => {
          changePage();
        }}
      >
        Login
      </button>
    </form>
  );
};

export const LoginForm: React.FC<Props> = ({ onSubmit, changePage }) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (_e: React.FormEvent) => {
    onSubmit(undefined, username);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Log In</button>
      <button
        onClick={() => {
          changePage();
        }}
      >
        Sign up
      </button>
    </form>
  );
};
