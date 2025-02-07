import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUserFromFirestore, signInUser } from '../../extras/firebase';


function Login() {
    const [formData,setFormData] = useState({
        email:"",
        password:""
    });
    const navigate = useNavigate();
    const [emptyField,setEmptyField] = useState(false);
    const [disableBtn,setDisableBtn]= useState(false);

    const handleInputChange = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        const { email, password } = formData;
        if (email.trim() === "" || password.trim() === "") {
            toast.error('Please enter all fields 🚫', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            setEmptyField(true);
        } else {
            setDisableBtn(true);
            try {
                const user = await signInUser(email, password);
                if (user) {
                    const loggedInUser = await getUserFromFirestore(user.uid);
                    localStorage.setItem('user', JSON.stringify(loggedInUser));
                    navigate('/user');
                }
            } catch (error) {
                console.error(error);
                toast.error('Invalid credentials 🚫', {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            } finally {
                setDisableBtn(false);
            }
        }
    }

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setEmptyField(false);
        },3000);
        return ()=>clearTimeout(timer);
    })
  return (
    <React.Fragment>
        <ToastContainer
            position="top-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            draggable
            theme="light"
            transition={Bounce}
        />
        <div className=' px-3 py-3'>
            <form action="" onSubmit={handleSubmit} className=' py-2 gap-10 flex flex-col'>
                <label className=' flex flex-col gap-1' htmlFor="">
                    <span className=' font-medium'>Email</span>
                    <input placeholder='Email' onChange={handleInputChange} name='email' type={"email"} className={`${emptyField?"border-red-600":"border-white"}  bg-gray-100 text-black p-1 rounded-md outline-none ring-1 ring-gray-300`} />
                </label>
                <label className=' flex flex-col gap-1' htmlFor="">
                    <span className=' font-medium'>Password</span>
                    <input placeholder='Password' onChange={handleInputChange} name='password' type="password" className={`${emptyField?"border-red-600":"border-white"}  bg-gray-100 text-black p-1 rounded-md outline-none ring-1 ring-gray-300`} />
                </label>
                <button disabled={disableBtn} className={` ${disableBtn?"bg-gray-900 text-gray-300":"bg-black text-white"} text-white py-1 uppercase font-medium rounded-md`}>Login</button>
            </form>
            <section className=' md:flex-row flex-col flex justify-between'>
                <span>Don&apos;t have an account? <Link to="/auth/register" className=' text-blue-500'>Register</Link></span>
                <span>
                    <Link to="/auth/forgot-password" className=' text-blue-500' >Forgot Password?</Link>
                </span>
            </section>
        </div>
    </React.Fragment>
  )
}

export default Login