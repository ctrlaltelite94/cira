import React from 'react'
import { useAppContext } from '../contexts/appContext';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from '../apiClient'

const Navbar = () => {
  const { isLoggedIn, userType } = useAppContext();
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      showToast({ message: "Signed Out Successfully", type: "SUCCESS" });
      await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
      navigate("/");
    },
    onError: (error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleLogout = () => {
    mutation.mutate();
  };

  return (
    <div className='w-full bg-gray-100 py-10'>
      <div className='w-[70%] mx-auto px-4'>
        <div className='flex justify-between items-center'>
          <Link to="/" className='text-blue-600 font-bold text-4xl'>
            CIRA
          </Link>

          <ul className='flex items-center gap-6 font-medium'>
            <li className=''>
              <Link to="/" className='hover:underline'>Home</Link>
            </li>
            <li className=''>
              <Link to="/about" className='hover:underline'>About</Link>
            </li>
            <li className=''>
              <Link to="/incidents" className='hover:underline'>Incidents</Link>
            </li>
            {/* Add more <li> items here */}
            {isLoggedIn ? (
              <>
                <li className=''>
                  <Link
                    to={userType === 'responder' ? '/responder/dashboard' : '/user/profile'}
                    className='hover:underline'
                  >
                    {userType === 'responder' ? 'Dashboard' : 'Profile'}
                  </Link>
                </li>
                <li className=' cursor-pointer hover:underline' onClick={handleLogout}>
                  Logout
                </li>
              </>
            ) : (
              <>
                <li className=''>
                  <Link to="/login" className='hover:underline'>Login</Link>
                </li>
                <li className='bg-green-600 hover:hover:bg-green-700 py-2 px-2 rounded-md text-white'>
                  <Link to="/signup">Get Started</Link>
                </li>

              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
