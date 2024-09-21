'use client'
import { useGetUsersQuery } from '../_RTKQ/usersApiSlice';
import styles from '../styles/Home.module.css';


function Dashboard() {
  const { data: users, isLoading, isError, error, isSuccess, } = useGetUsersQuery();
  const formatDate = (dateString) => {
    const match = dateString.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!match) return "Invalid date format";

    const year = match[1];
    const month = match[2];
    const day = match[3];

    return `${year}/${month}/${day}`;
  };
  // console.log(users);

  return (
    <>
      {isLoading && !isError && <p>Loading...</p>}
      {!isLoading && isError && <p>Error: {error?.data?.message}</p>}
      {!isLoading && isSuccess && users && users.length > 0 && (
        <>
        <h1> Home Page </h1>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.email}</td>
                  <td>{formatDate(user.createdAt)}</td>
                  <td>{formatDate(user.updatedAt)}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
       )} 
    </>
  );
}

export default Dashboard;
