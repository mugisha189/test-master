import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";

export default function Home() {
  const { user } = useAuth();
  const getUser = useUser();

  useEffect(() => {
    getUser();
    console.log(user);
  }, []);

  return (
    <div className="container mt-3">
      <h2>
        <div className="row">
          <div className="mb-12">
            {user?.email !== undefined
              ? "List user Ethereum balance"
              : "Please login first"}
            {user.balance && (
              <p className="fw-bold">Balance (ethers):{user.balance}</p>
            )}
          </div>
        </div>
      </h2>
    </div>
  );
}
