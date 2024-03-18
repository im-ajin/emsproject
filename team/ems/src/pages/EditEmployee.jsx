import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import EmployeeForm from '../components/EmployeeForm'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from "../firebase";
import { useParams } from 'react-router-dom';


const EditEmployee = () => {

  const {id} = useParams();
  const [formData, setFormData] = useState({});
  const [image, setImage] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:3000/employee/getEmployee/${id}`);
        const data = await res.json();
        console.log('res', res);
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setFormData(data.employee);
          setLoading(false);
          setError(null);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);

  function handleChange(e){
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleImageChange = (e) => {
    setImage(e.target.files[0])
  };

 

  const handleFileUpload = async () => {
    if(!image){
      enqueueSnackbar('Please choose the image',{ variant : 'error'})
      return
    }
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(Math.round(progress));
      },
      (error) => {
        console.log(error.message)
        setImageUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, eimage: downloadURL })
        );
      }
    );
  };

      
async function handleSubmit(e){
  e.preventDefault();
  if(!formData.eimage){
     setUploadError('upload a image')
     return
  }
  try{
     const res = await fetch(`http://localhost:3000/employee/editEmployee/${id}`,{
       method: 'PUT',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(formData)
     });
     const data = await res.json();
     if(!res.ok){
       setUploadError(data.message);
       return
     }
    
     if(res.ok){
       setUploadError(null)
       alert("upload successfully")
       console.log(data);
     }

   }catch(error){
    console.log(error.message);
     setUploadError('Something went wrong')    
   }
  
}
  

  return (
    <>
    {formData ? (
     <>
    <div className='mb-3'>EMS</div>
    <Navbar />
    <h1 className='bg-yellow-300 mt-3'>Edit Employee</h1>
    <p className='text-red-500'>{uploadError && uploadError}</p>
   
    <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="name" id='name'>Name</label>
            <input type="text" className='border border-gray-500' name='ename' value={formData.ename} onChange={handleChange} required/>
        </div>
        <div>
            <label htmlFor="email" id='email'>Email</label>
            <input type="email" className='border border-gray-500' name='eemail' onChange={handleChange} required value={formData.eemail}/>
        </div>
        <div>
            <label htmlFor="mnumber" id='mnumber'>Phone Number</label>
            <input type="text" className='border border-gray-500' name='emobile' onChange={handleChange} required value={formData.emobile}/>
        </div>
        <div>
            <label htmlFor="designation" id='designation'>Designation</label>
            <select className='border border-gray-500' name='edesignation' onChange={handleChange} required value={formData.edesignation}>
                <option value="">Select</option>
                <option value="hr">HR</option>
                <option value="manager">Manager</option>
                <option value="sales">Sales</option>
            </select>
        </div>
        <div>
        <label>
        <input
        name='egender'
          type="checkbox"
          value={formData.egender}
          checked={formData.egender === 'male' ? true : false}
          onChange={(e) => {setFormData({...formData, egender: e.target.value})}}
        />
        Male
      </label>
      <br />
      <label>
        <input
        name='egender'
          type="checkbox"
          value={formData.egender}
          checked={formData.egender === 'female' ? true : false}
          onChange={(e) => {setFormData({...formData, egender: e.target.value})}}
        />
        Female
      </label>
        </div>
        <div>
            <label htmlFor="course" id='course'>Course</label>
            <select className='border border-gray-500' name='ecourse' onChange={handleChange} required value={formData.ecourse}>
                <option value="">Select</option>
                <option value="mca">MCA</option>
                <option value="bca">BCA</option>
                <option value="bsc">BSC</option>
            </select>
        </div>
        <div>
          <label htmlFor="">Upload the image</label>
          <input type="file" accept="image/jpeg, image/png" onChange={handleImageChange} required/>
          <p>{imageUploadProgress && imageUploadProgress}</p>
          {
            formData.eimage ? (
              <img src={formData.eimage} alt="" height={50} width={50}/>
            ) : 
            null
          }
           <button type='button' className='border border-gray-500' onClick={handleFileUpload}>upload image</button>
        </div>
        <button type='submit' onClick={handleSubmit}>Update</button>
    </form>
    </>
    ) : (<p>Employee not available</p>)}
    </>
  )
}

export default EditEmployee