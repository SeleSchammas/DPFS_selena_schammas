import React from "react";

const UserList = ({ users }) => {
  if (!users || users.length === 0) return <p>No hay usuarios registrados</p>;

  return (
    <div className="table-responsive mt-4">
      <h3>Usuarios</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
