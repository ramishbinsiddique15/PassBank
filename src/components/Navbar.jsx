import React from "react";
import github from "/img/github-icon.ico";
const Navbar = () => {
  return (
    <nav className="bg-slate-800  text-white">
      <div className="mycontainer flex justify-between  items-center md:px-10 px-3 py-5 h-14">
        <div className="logo font-bold text-2xl">
          <span className="text-green-500">&lt; </span>
          Pass
          <span className="text-green-500">Bank /&gt;</span>
        </div>

        {/* <ul>
        <li className="flex gap-4 ">
            <a className="hover:font-bold" href="#">Home</a>
            <a className="hover:font-bold" href="#">About</a>
            <a className="hover:font-bold" href="#">Contact</a>

        </li>
      </ul> */}
        <button
          href="github.com"
          className="flex ring-2 ring-white gap-3 items-center justify-between px-3 py-2 rounded-lg bg-green-500  hover:bg-green-400 text-black text-xl font-bold"
        >
          <img className="cursor-pointer" src={github} alt="" />
          Github
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
