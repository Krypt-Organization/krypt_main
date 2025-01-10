import React, { useEffect, useState } from 'react'
import {  FaEdit, FaSave, FaCrown } from 'react-icons/fa'
import {getUserFromFirestore} from "../../extras/firebase"

export default function UserPage() {
  const [user, setUser] = useState({
    uid: 'user123',
    username: 'John Doe',
    email: 'john@example.com',
    avatar: '/placeholder.svg?height=200&width=200',
    treasureHuntPrize: 'Exclusive Designer Collaboration NFT'
  })

//   const [purchasedNFTs, setPurchasedNFTs] = useState([
//     { id: 'nft1', name: 'Pixel Hoodie', description: 'A trendy digital hoodie', price: 0.5, image: '/placeholder.svg?height=100&width=100', purchaseDate: '2023-06-01' },
//     { id: 'nft2', name: 'Neon Sneakers', description: 'Glowing digital sneakers', price: 0.3, image: '/placeholder.svg?height=100&width=100', purchaseDate: '2023-06-15' },
//   ])

  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState(user)

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
    const userId = localStorage.getItem("user");
    if(userId){
        try{
            const parsedUser = JSON.parse(userId); // Parse stored JSON string
            const user = await getUserFromFirestore(parsedUser.uid); // Fetch user from Firestore
            console.log("User Data:", user);
        }catch(error){
            console.error(error);
        }
    }
  }
  useEffect(()=>{
    fetchUserFn();
  },[]);

  return (
    <React.Fragment>
        <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-8">Welcome Username</h1>
        
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <div className="flex items-center  justify-between mb-4">
            <div className="flex ">
              {/* <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full mr-4" /> */}
              <div>
                <h2 className="text-2xl font-semibold">{user.username}</h2>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-500">User ID: {user.uid}</p>
              </div>
            </div>
            {!isEditing ? (
              <button onClick={handleEdit} className="bg-blue-500 flex items-center text-white p-2 rounded">
                <FaEdit className="mr-2" /> Edit Profile
              </button>
            ) : (
              <button onClick={handleSave} className="bg-green-500 text-white p-2 rounded">
                <FaSave className="mr-2" /> Save Changes
              </button>
            )}
          </div>
          
          {!isEditing ? (
            <div>
              <p className="text-gray-700 mb-4">Fashion NFT enthusiast</p>
              {user.treasureHuntPrize && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
                  <p className="font-bold flex items-center">
                    <FaCrown className="mr-2" /> Treasure Hunt Prize Won!
                  </p>
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
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={editedUser.bio}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
            </div>
          )}
        </div>

        <h2 className="text-2xl font-semibold mb-4">Your Recent NFT Purchases</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* {purchasedNFTs.map(nft => (
            <div key={nft.id} className="bg-white shadow rounded-lg overflow-hidden">
              <img src={nft.image} alt={nft.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{nft.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{nft.description}</p>
                <p className="font-semibold">{nft.price} ETH</p>
                <p className="text-sm text-gray-500">Purchased on: {nft.purchaseDate}</p>
              </div>
            </div>
          ))} */}
        </div>
      </div>
    </div>
    </React.Fragment>
  )
}