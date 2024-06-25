import React from "react";
import eye from "/img/eye.svg";
import eyeCross from "/img/eye-cross.svg";
import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const [show, setShow] = useState(eyeCross);
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const passRef = useRef();

  const showPassword = () => {
    if (show === eyeCross) {
      setShow(eye);
      passRef.current.type = "text";
    } else {
      setShow(eyeCross);
      passRef.current.type = "password";
    }
  };

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json();
    setPasswordArray(passwords);
  };
  useEffect(() => {
    getPasswords();
  }, []);

  const savePassword = async () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      let updatedPasswords = passwordArray;
  
      if (form.id) {
        // Remove the old entry from the local state first
        updatedPasswords = passwordArray.filter(
          (password) => password.id !== form.id
        );
  
        // Delete the old password entry from the database
        await fetch("http://localhost:3000/", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: form.id }),
        });
      }
  
      // Add the new or updated password to the local state
      const newPassword = { ...form, id: form.id || uuidv4() };
      setPasswordArray([...updatedPasswords, newPassword]);
  
      // Save the new password entry to the database
      await fetch("http://localhost:3000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPassword),
      });
  
      // Reset the form state
      setForm({ site: "", username: "", password: "", id: "" });
  
      toast("🦄 Password Saved!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.error("🦄 Password not saved", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  


  const deletePassword = async (id) => {
    if (confirm("Are you sure you want to delete this password?")) {
      const updatedPasswords = passwordArray.filter(
        (password) => password.id !== id
      );
      setPasswordArray(updatedPasswords);
      let res = await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      // localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
      toast("🦄 Password Deleted!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const editPassword = (id) => {


    setForm({...passwordArray.filter((password) => password.id === id)[0], id: id})
    setPasswordArray(passwordArray.filter((password) => password.id !== id))

  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast("🦄 Copied to Clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="bg-green-100 min-h-[85vh]">
        <div className="p-2  md:mycontainer ">
          <h1 className="text-4xl font-bold text-center">
            <span className="text-green-500">&lt; </span>
            Pass
            <span className="text-green-500">Bank /&gt;</span>
          </h1>
          <p className="text-green-500 text-center text-lg font-bold">
            Your own password manager
          </p>
          <div className="text-black flex flex-col items-center gap-5 p-4">
            <input
              value={form.site}
              onChange={handleChange}
              placeholder="Website URL"
              className="p-1 rounded-lg border-2 border-green-500 w-full"
              type="text"
              name="site"
            />
            <div className="flex md:flex-row flex-col justify-between w-full gap-5">
              <input
                value={form.username}
                onChange={handleChange}
                placeholder="Username"
                type="text"
                className="p-1 rounded-lg border-2 w-full border-green-500"
                name="username"
              />
              <div className="relative w-full">
                <input
                  ref={passRef}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Password"
                  type="password"
                  className="p-1 rounded-lg border-2 w-full border-green-500"
                  name="password"
                />
                <span
                  className="absolute right-[3px] top-[5px] cursor-pointer invert"
                  onClick={showPassword}
                >
                  <img className="" src={show} width={25} alt="" />
                </span>
              </div>
            </div>
            <button
              onClick={savePassword}
              className="flex items-center justify-center bg-green-500 hover:bg-green-400 rounded-lg p-1 px-2 w-fit"
            >
              <lord-icon
                src="https://cdn.lordicon.com/jgnvfzqg.json"
                trigger="hover"
              ></lord-icon>
              Save Password
            </button>
          </div>
          <div className="passwords">
            <h1 className="font-bold text-green-500 text-2xl py-4">
              Your Passwords
            </h1>
            {passwordArray.length === 0 && (
              <p className="text-green-500 text-2xl">No passwords saved yet</p>
            )}
            {passwordArray.length !== 0 && (
              <table className="table-auto w-full rounded-md overflow-hidden">
                <thead className="bg-green-500 text-white">
                  <tr>
                    <th className="py-2 border-2 border-white">Site</th>
                    <th className="py-2 border-2 border-white">Username</th>
                    <th className="py-2 border-2 border-white">Password</th>
                    <th className="py-2 border-2 border-white">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-green-300">
                  {passwordArray.map((password, index) => (
                    <tr key={index}>
                      <td className="py-2 border-2 border-white text-center">
                        <div className="flex items-center justify-center">
                          <a target="_blank" href={password.site}>
                            {password.site}
                          </a>
                          <div
                            className="copy py-1 size-7 cursor-pointer"
                            onClick={() => copyText(password.site)}
                          >
                            <lord-icon
                              style={{ width: "25px", height: "25px" }}
                              className={"ml-2 cursor-pointer"}
                              src="https://cdn.lordicon.com/depeqmsz.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border-2 border-white text-center">
                        <div className="flex items-center justify-center">
                          {password.username}
                          <div
                            className="copy py-1 size-7 cursor-pointer"
                            onClick={() => copyText(password.username)}
                          >
                            <lord-icon
                              style={{ width: "25px", height: "25px" }}
                              className={"ml-2 cursor-pointer"}
                              src="https://cdn.lordicon.com/depeqmsz.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border-2 border-white text-center">
                        <div className="flex items-center justify-center">
                          {"*".repeat(password.password.length)}
                          <div
                            className="copy py-1 size-7 cursor-pointer"
                            onClick={() => copyText(password.password)}
                          >
                            <lord-icon
                              style={{ width: "25px", height: "25px" }}
                              className={"ml-2 cursor-pointer"}
                              src="https://cdn.lordicon.com/depeqmsz.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border-2 border-white text-center">
                        <span
                          className="cursor-pointer mx-2"
                          onClick={() => editPassword(password.id)}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/wvdxdmpi.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                        <span
                          className="cursor-pointer"
                          onClick={() => deletePassword(password.id)}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Manager;
