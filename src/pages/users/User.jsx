import React, { useEffect, useState } from 'react'
import {  FaEdit, FaSave, FaCrown } from 'react-icons/fa'
import {getUserFromFirestore, signOutUser} from "../../extras/firebase"
import userImg from "../../assets/user.png";
import { useNavigate } from 'react-router-dom';

export default function UserPage() {
  const [user, setUser] = useState({
    uid: 'user123',
    username: 'John Doe',
    email: 'john@example.com',
  });

  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState(user);
  const [isLoading,setisLoading] = useState(false);
  const handleLogOut = async()=>{
    try{
        await signOutUser()
        localStorage.removeItem("user");
        window.location.href = "/"
    }catch(error){
        console.log(error);
    }
  }
  const handleEdit = () => {
    setIsEditing(true)
    setEditedUser(user)
  }

  const handleSave = () => {
    setUser(editedUser)
    setIsEditing(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditedUser(prev => ({ ...prev, [name]: value }))
  }

  const fetchUserFn = async()=>{
    setisLoading(true)
    const userId = localStorage.getItem("user");
    if(userId){
        try{
            const parsedUser = JSON.parse(userId); // Parse stored JSON string
            const user = await getUserFromFirestore(parsedUser.uid); // Fetch user from Firestore
            console.log("User Data:", user);
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
    return <div>Fetching User Data Please Wait.....</div>;
  }
  return (
    <React.Fragment>
    <div className="min-h-screen text-white bg-gray-900 p-8">
        <div className="max-w-4xl mx-auto">
            <header className=' mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3'>
                <section className='  flex items-center gap-2'>
                    <img src={userImg} className=' w-5' alt="User Display IUmage" />
                    <h1 className="  sm:text-2xl md:text-3xl font-bold">Welcome {user.username}</h1>
                </section>
                <button className=' border-[1px] hover:scale-110 hover:transition-all border-green-400 rounded-md font-semibold py-1 px-3' onClick={()=>{
                    navigate("/")
                }}>Go Back</button>
            </header>
            <div className="bg-gray-200 text-black shadow rounded-lg p-6 mb-8">
            <div className="flex sm:items-center gap-5 flex-col sm:flex-row  justify-between mb-4">
                <div className="flex ">
                {/* <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full mr-4" /> */}
                <div className=' flex flex-col gap-2'>
                    <h2 className="text-2xl font-semibold">{user.username}</h2>
                    <p className="text-gray-600">{user.email}</p>
                    <p className="text-sm  text-gray-500"><span className='font-semibold'>User ID:</span> {user.uid}</p>
                </div>
                </div>
                {!isEditing ? (
                <button onClick={handleEdit} className="bg-blue-500 flex items-center text-white p-2 rounded">
                    <FaEdit className="mr-2" /> Edit Profile
                </button>
                ) : (
                <button onClick={handleSave} className="bg-green-500 text-white p-2 rounded flex gap-3 items-center ">
                    <FaSave /> <span>Save Changes</span>
                </button>
                )}
            </div>
            
            {!isEditing ? (
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
            ) : (
                <div className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                    type="text"
                    id="name"
                    name="name"
                    value={editedUser.name}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                    type="email"
                    id="email"
                    name="email"
                    value={editedUser.email}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>
                </div>
            )}
            </div>

            <h2 className="text-2xl font-semibold mb-4">Your Recent NFT Purchases</h2>
            <div className="grid text-black grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {user.purchased?.length==0?
            <div>
                <p className=' bg-white py-3 rounded-lg px-5 text-lg'>No Previous Products purchased😢</p>           
            </div>:user.purchased?.map(nft => (
                <div key={nft.id} className="bg-white shadow rounded-lg overflow-hidden">
                    <img src={nft.image} alt={nft.name} className="w-full h-48 object-cover" />
                    <div className="p-4">
                        <h3 className="font-semibold text-lg mb-2">{nft.name}</h3>
                        <p className="text-gray-600 text-sm mb-2">{nft.description}</p>
                        <p className="font-semibold">{nft.price} ETH</p>
                        <p className="text-sm text-gray-500">Purchased on: {nft.purchaseDate}</p>
                    </div>
                </div>
            ))}
            </div>
            <div className=' grid md:grid-cols-2 mt-5 items-center'>
                <button onClick={handleLogOut} className=' py-1 rounded-md text-white font-semibold uppercase bg-red-500'>Logout </button>
            </div>
        </div>
    </div>
    </React.Fragment>
  )
}