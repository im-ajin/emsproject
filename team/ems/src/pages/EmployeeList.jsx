import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom';

const EmployeeList = () => {

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  

  const filteredEmployees = employees.filter((employee) =>
    Object.values(employee).some((field) =>
      String(field).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  useEffect(()=>{
    const fetchEmployees = async () => {
      try{
          setLoading(true);
          const res = await fetch(`http://localhost:3000/employee/getEmployees`);
          const data = await res.json();
          if(!res.ok){
              setError(true)
              setLoading(false)
              return
          }
          if(res.ok){
              setEmployees(data)
              setLoading(false)
              setError(null)
          }
      }catch(error){
          setError(true);
          setLoading(false);
      }
  }
  fetchEmployees();
  },[])

async function handleDelete(id){
  const res = await fetch(`http://localhost:3000/employee/deleteEmployee/${id}`,{
    method : 'DELETE'
  })
  if(!res.ok){
    setError('deleted failed')
    return
  }
    console.log('work');
    const updatedEmployes = employees.filter((employee) => employee._id !== id)
    console.log(updatedEmployes);
    setEmployees(updatedEmployes)
}
  return (
    <>
    <div>
    <div className='mb-3'>EMS</div>
    <Navbar />
    <h1 className='bg-yellow-300'>Employee List</h1>
    <div className='flex justify-between px-2 mb-3'>
      <p>Total Count {employees.length}</p>
      <Link to='create'><p>Create Employee</p></Link>
    </div>
    </div>
    <input type="text" placeholder='search' className='border border-gray-500 rounded-lg mb-3' onChange={(e) => {setSearchQuery(e.target.value)}} value={searchQuery}/>
    <table className='border border-gray-500 w-full'>
    <thead className='border border-gray-500'>
    <tr>
      <th>Unique Id</th>
      <th>Image</th>
      <th>Name</th>
      <th>Email</th>
      <th>Mobile No</th>
      <th>Designation</th>
      <th>Gender</th>
      <th>Course</th>
      <th>Create date</th>
      <th>Action</th>
    </tr>
    </thead>
    <tbody>
      {filteredEmployees.length > 0 ? (
        filteredEmployees.map((employee) => (
          <tr className='border border-gray-500'>
            <th>{employee._id}</th>
            <th>
              <img src={employee.eimage} alt="" height={30} width={30}/>
            </th>
            <th>{employee.ename}</th>
            <th>{employee.eemail}</th>
            <th>{employee.emobile}</th>
            <th>{employee.edesignation}</th>
            <th>{employee.egender}</th>
            <th>{employee.ecourse}</th>
            <th>{employee.createdAt}</th>
            <th>
              <Link to={`/edit/${employee._id}`}><button className='border px-2 bg-green-600 text-white'>Edit</button></Link>
              <button className='border px-2 bg-red-500 text-white' onClick={()=>handleDelete(employee._id)}>Delete</button>
            </th>
          </tr>
        ))
      ) : null}
    </tbody>
 
    </table>
    </>
  )
}

export default EmployeeList