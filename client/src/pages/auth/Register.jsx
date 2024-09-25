import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../api/apiConfig";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [ethError, setEthError] = useState(""); // State to store Ethereum validation error
  const first_name = useRef();
  const last_name = useRef();
  const email = useRef();
  const password = useRef();
  const password2 = useRef();
  const ethereumWallet = useRef(); // Reference for Ethereum wallet address

  async function onSubmitForm(event) {
    event.preventDefault();
    const walletAddress = ethereumWallet.current.value;

    // Validate Ethereum wallet address
    if (!isValidEthereumAddress(walletAddress)) {
      setEthError("Please enter a valid Ethereum wallet address.");
      return;
    }

    const data = {
      first_name: first_name.current.value,
      last_name: last_name.current.value,
      email: email.current.value,
      password: password.current.value,
      password2: password2.current.value,
      ethereum_wallet: walletAddress, // Include the wallet address
    };

    setLoading(true);

    try {
      const response = await axiosInstance.post(
        "auth/register",
        JSON.stringify(data)
      );

      setLoading(false);
      navigate("/auth/login");
    } catch (error) {
      setLoading(false);
      // TODO: handle errors (e.g., set a global error state)
    }
  }

  function isValidEthereumAddress(address) {
    return /^0x[a-fA-F0-9]{40}$/.test(address); // Regex to validate Ethereum addresses
  }

  function handleEthInputChange() {
    // Clear the error message when the input changes
    setEthError("");
  }

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={onSubmitForm}>
        <div className="mb-3">
          <input
            type="text"
            placeholder="First Name"
            autoComplete="off"
            className="form-control"
            id="first_name"
            ref={first_name}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Last Name"
            autoComplete="off"
            className="form-control"
            id="last_name"
            ref={last_name}
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            placeholder="Email"
            autoComplete="off"
            className="form-control"
            id="email"
            ref={email}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Ethereum Wallet Address"
            autoComplete="off"
            className={`form-control ${ethError ? "is-invalid" : ""}`} // Add invalid class if there's an error
            id="ethereum_wallet"
            ref={ethereumWallet}
            onChange={handleEthInputChange} // Handle input change
          />
          {ethError && <div className="invalid-feedback">{ethError}</div>}{" "}
          {/* Show error message */}
        </div>
        <div className="mb-3">
          <input
            type="password"
            placeholder="Password"
            autoComplete="off"
            className="form-control"
            id="password"
            ref={password}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            placeholder="Confirm Password"
            autoComplete="off"
            className="form-control"
            id="passwordConfirmation"
            ref={password2}
          />
        </div>
        <div className="mb-3">
          <button disabled={loading} className="btn btn-success" type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
