import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
     
      if (data.success === true) {
        toast.success(data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        dispatch(signInSuccess(data));
      } else {
        toast.error(data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="p-4 m-auto w-full max-w-lg">
      <div className="p-3 w-full text-2xl font-medium text-center">
        <h3>Sign In</h3>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="email"
          placeholder="email"
          className="py-3 pl-4 w-full rounded-md bg-slate-100"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          className="py-3 pl-4 w-full rounded-md bg-slate-100"
          onChange={handleChange}
        />
        <div className="flex flex-col">
          <button
            type="submit"
            className="p-3 w-full text-white bg-blue-500 rounded-md hover:opacity-80"
          >
            Sign In
          </button>
        </div>
        <OAuth />
      </form>
      <div className="flex gap-2 py-3">
        <p>Don&#39;t have an account ?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-500">Sign Up</span>
        </Link>
      </div>
    </section>
  );
};

export default SignIn;
