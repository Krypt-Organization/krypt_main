import React, { useEffect, useState } from 'react'
import {FaCrown } from 'react-icons/fa'
import {deleteUserFn, getUserFromFirestore, signOutUser} from "../../extras/firebase";
import { useNavigate } from 'react-router-dom';
import {BarLoader} from "react-spinners";
import UserAssets from './UserAssets'
import { CgProfile } from "react-icons/cg";

export default function UserPage() {
    
  const [user, setUser] = useState({
    uid: 'user123',
    username: 'John Doe',
    email: 'john@example.com',
  });

  const navigate = useNavigate();
  const [isLoading,setisLoading] = useState(false);
  
  const [isDeleting, setIsDeleting] = useState(false);

const handleDeleteUser = async () => {
    setIsDeleting(true);
    try {
        await deleteUserFn(user.uid);
        await handleLogOut();
    } catch (error) {
        console.error(error);
    } finally {
        setIsDeleting(false);
    }
};

  const handleLogOut = async()=>{
    try{
        await signOutUser()
        localStorage.removeItem("user");
        window.location.href = "/"
    }catch(error){
        console.log(error);
    }
  }


  const fetchUserFn = async()=>{
    setisLoading(true)
    const userId = localStorage.getItem("user");
    if(userId){
        try{
            const parsedUser = JSON.parse(userId); // Parse stored JSON string
            const user = await getUserFromFirestore(parsedUser.uid); // Fetch user from Firestore
            setUser(user);
            setisLoading(false);
        }catch(error){
            console.error(error);
            setisLoading(false);
        }
    }
  }
  useEffect(()=>{
    fetchUserFn();
  },[]);

  if(isLoading){
    return <div className=" flex flex-col justify-center h-screen items-center"><BarLoader
    color="#245cc9"
    height={6}
    width={120}
  /></div>;
  }
  return (
    <React.Fragment>
    <div className="min-h-screen text-white bg-gray-900 p-8">
        <div className="max-w-4xl mx-auto">
            <header className=' mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3'>
                <section className='  flex items-center gap-2'>
                    <CgProfile className=" text-3xl" />
                    <h1 className="  sm:text-2xl md:text-3xl font-bold">Welcome {user.username}</h1>
                </section>
                <button className=' border-[1px] hover:scale-110 hover:transition-all border-green-400 rounded-md font-semibold py-1 px-3' onClick={()=>{
                    navigate("/")
                }}>Go Back</button>
            </header>
            <div className="bg-gray-200 text-black shadow rounded-lg p-6 mb-8">
            <div className="flex sm:items-center gap-5 flex-col sm:flex-row  justify-between mb-4">
                <div className="flex ">
                <div className=' flex flex-col gap-2'>
                    <h2 className="text-2xl font-semibold">{user.username}</h2>
                    <p className="text-gray-600">{user.email}</p>
                    <p className="text-sm  text-gray-500"><span className='font-semibold'>User ID:</span> {user.uid}</p>
                </div>
                </div>
                
            </div>
            
            
                <div>
                <div className=" flex gap-2 font-semibold  bg-yellow-400 rounded-md py-1 px-2 text-black mb-4">
                    <p className="font-bold flex items-center">
                        <FaCrown />
                    </p>
                    <p>Fashion NFT enthusiast</p>    
                </div>
                {user.treasureHuntPrize && (
                    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
                    <p>{user.treasureHuntPrize}</p>
                    </div>
                )}
                </div>
              
            </div>
            <UserAssets/>
            <button onClick={handleLogOut} className=' flex w-full mt-5 items-center justify-center rounded-md text-white font-semibold uppercase text-center bg-red-500'>
                Logout
            </button>
            <button onClick={handleDeleteUser} disabled={isDeleting}  className={` flex w-full mt-5 items-center justify-center rounded-md text-white font-semibold uppercase text-center ${isDeleting?"border-gray-300":"border-red-400"} border-[1px]`}>
                Delete Account
            </button>
        </div>
    </div>
    </React.Fragment>
  )
}