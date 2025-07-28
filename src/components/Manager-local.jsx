import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const [Form, setForm] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    useEffect(() => {
        console.log(Form);
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setpasswordArray(JSON.parse(passwords));
        }
    }, [])

    const savePassword = () => {
        if (Form.site.length > 3 && Form.username.length > 3 && Form.password.length > 3 ) {
            setpasswordArray([...passwordArray, { ...Form, id: uuidv4() }])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...Form, id: uuidv4() }]));
            console.log([...passwordArray, Form]);
            setForm({ site: "", username: "", password: "" })
        }
        else {
            toast('Values are too small', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }


    }
    const deleteData = (id) => {
        toast('Password deleted', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        console.log("deleting pass of id:" + id);
        setpasswordArray(passwordArray.filter(item => item.id !== id))
        localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
    }

    const editData = (id) => {
        console.log("editing pass of id:" + id);
        setForm(passwordArray.filter(i => i.id === id)[0])
        setpasswordArray(passwordArray.filter(item => item.id !== id))
    }

    const handelChange = (e) => {
        setForm({ ...Form, [e.target.name]: e.target.value })
    }

    const copyData = (text) => {
        navigator.clipboard.writeText(text)
    }



    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"

            />
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <div className="form relative bg-blue-50 py-5 px-10 gap-2.5 md:mx-65">
                <input className='border-blue-500 border-2 w-full my-2 h-10 px-5 rounded-4xl' value={Form.site} onChange={handelChange} name='site' type="text" placeholder='URL of site' />
                <div className="flex items-left md:items-center md:flex-row flex-col md:gap-4">
                    <input className='border-blue-500 border-2 md:w-2/3 my-2 h-10 px-5 rounded-4xl' value={Form.username} onChange={handelChange} name='username' type="text" placeholder='Username' />
                    <input className='border-blue-500 border-2 md:w-1/3 my-2 h-10 px-5 rounded-4xl' value={Form.password} onChange={handelChange} name='password' type="text" placeholder='Password' />
                </div>
                <div className="flex items-center justify-center mt-3 py-2">
                    <button className='bg-blue-500 flex items-center justify-center text-white border-2 px-5 py-[2px] text-xl rounded-3xl' onClick={() => { savePassword(Form) }}>save</button></div>
                
            </div>
            <div className="Passwords py-5 px-2 gap-2.5 md:mx-65">
                <h1 className='font-bold text-3xl mb-3'>Your Passwords</h1>
                {passwordArray.length === 0 && <div className='text-left text-2xl '>No Passwords to show</div>}
                {passwordArray.length != 0 && <div className="Table">
                    <table className="table-auto w-full text-center md:rounded-2xl overflow-hidden text-[13px] md:text-xl">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th>URL</th>
                                <th>username</th>
                                <th>Password</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {passwordArray.map((item, key) => {
                                return <tr key={key} className="bg-blue-50 ">
                                    <td className="py-2.5 border-2 border-white"><div className='flex items-center justify-center gap-1'><a href={item.site} target='_blank'><span>{item.site}</span></a><img src="src\assets\file-copy-fill.png" alt="copy" onClick={() => { copyData(item.site) }} /></div></td>
                                    <td className="py-2.5 border-2 border-white"><div className='flex items-center justify-center gap-1'><span>{item.username}</span><img src="src\assets\file-copy-fill.png" alt="copy" onClick={() => { copyData(item.username) }} /></div></td>
                                    <td className="py-2.5 border-2 border-white"><div className='flex items-center justify-center gap-1'><span>{item.password}</span><img src="src\assets\file-copy-fill.png" alt="copy" onClick={() => { copyData(item.password) }} /></div></td>
                                    <td className="py-2.5 border-2 border-white"><div className='flex items-center justify-center gap-1'><img src="src\assets\pencil-fill.png" alt="edit" onClick={() => { editData(item.id) }} />
                                        <img src="src\assets\delete-bin-6-fill.png" alt="delete" onClick={() => { deleteData(item.id) }} />
                                    </div>
                                    </td>

                                </tr>
                            })}

                        </tbody>
                    </table>
                </div>}

            </div>

        </>
    )
}

export default Manager