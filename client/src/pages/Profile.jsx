import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";
import { toast } from "react-toastify";

const Profile = () => {
  const [formData, setFormData] = useState({});
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const { currentUser } = useSelector((state) => state.user);

  console.log(image);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");

        if (Math.round(progress) === 100) {
          toast.success("Image uploaded successfully !", {
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
      },
      (error) => {
        // Handle unsuccessful uploads
        if (error) {
          toast.success("Error uploading image !", {
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
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  if (currentUser) {
    return (
      <section className="flex flex-col gap-5 p-4 m-auto w-full max-w-lg">
        <div className="p-3 w-full text-2xl font-medium text-center">
          <h3>Update Profile</h3>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="m-auto">
            <input
              type="file"
              ref={fileRef}
              onChange={(e) => setImage(e.target.files[0])}
              hidden
              accept="image/*"
            />
            <img
              src={formData.profilePicture || currentUser.user.profilePicture}
              alt={currentUser.user.username}
              onClick={() => fileRef.current.click()}
              className=" overflow-hidden cursor-pointer w-[150px] h-[150px] rounded-full object-cover"
            />
          </div>
          <input
            type="text"
            name="username"
            placeholder="username"
            className="py-3 pl-4 w-full rounded-md bg-slate-100"
            onChange={handleChange}
            value={currentUser.user.username}
          />
          <input
            type="text"
            name="email"
            placeholder="email"
            className="py-3 pl-4 w-full rounded-md bg-slate-100"
            onChange={handleChange}
            value={currentUser.user.email}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            className="py-3 pl-4 w-full rounded-md bg-slate-100"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="p-3 w-full text-white bg-blue-500 rounded-md hover:opacity-80"
          >
            Update
          </button>
        </form>
        <button
          type="submit"
          className="p-3 w-full text-white bg-red-500 rounded-md hover:opacity-80"
        >
          Delete Profile
        </button>
      </section>
    );
  }

  return <Navigate to={"/sign-in"} />;
};

export default Profile;
