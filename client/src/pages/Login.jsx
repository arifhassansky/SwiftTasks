import { FcGoogle } from "react-icons/fc";
import loginImg from "../assets/login.avif";
import { useContext } from "react";
import authContext from "../context/AuthContext";
import { toast } from "react-toastify";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { googleSignIn } = useContext(authContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    googleSignIn().then((result) => {
      // Extract user info from the result
      const user = result?.user;

      // Construct user data
      const userData = {
        name: user.displayName || "Unknown User",
        email: user.email || "No Email Found",
        photo: user.photoURL,
        timeStamp: Date.now(),
      };

      // Check if email is null
      if (!user.email) {
        console.error("Email is null. Full user object:", user);
        toast.error("Unable to fetch email. Please try again.");
        return;
      }

      // Save user to the database
      axiosPublic.post("/users", userData);
      navigate("/");
      toast.success("Login Successful!");
    });
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center mb-28">
      {/* login image */}
      <div>
        <img src={loginImg} />
      </div>
      {/* login with google button */}
      <div className="space-y-3">
        <h3 className="font-semibold text-3xl">Login With Google</h3>
        <h2
          onClick={handleGoogleLogin}
          className="flex justify-center cursor-pointer"
        >
          <FcGoogle size={50} />
        </h2>
      </div>
    </div>
  );
};

export default Login;
