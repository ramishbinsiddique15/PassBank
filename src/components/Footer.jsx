import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-slate-800 text-white p-1 m-0 relative w-full py-4 bottom-0 flex flex-col justify-center items-center px-2 md:px-10'>
        <div className="logo font-bold text-2xl">
          <span className="text-green-500">&lt; </span>
          Pass
          <span className="text-green-500">Bank /&gt;</span>
        </div>
        <div className='flex items-center'>Created with  <svg className='relative top-[1px] mx-1' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="" fill="red">
    <path d="M19.4626 3.99415C16.7809 2.34923 14.4404 3.01211 13.0344 4.06801C12.4578 4.50096 12.1696 4.71743 12 4.71743C11.8304 4.71743 11.5422 4.50096 10.9656 4.06801C9.55962 3.01211 7.21909 2.34923 4.53744 3.99415C1.01807 6.15294 0.221721 13.2749 8.33953 19.2834C9.88572 20.4278 10.6588 21 12 21C13.3412 21 14.1143 20.4278 15.6605 19.2834C23.7783 13.2749 22.9819 6.15294 19.4626 3.99415Z" stroke="currentColor" strokeWidth="" strokeLinecap="round" />
</svg>  | Ramish Bin Siddique</div>
    </footer>
  )
}

export default Footer
