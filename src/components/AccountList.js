import { Button, Spinner, Table } from "reactstrap";

const mapValuePosition = {
  1: "Hanh Chinh",
  2: "Hoc Tap"
}

export const AccountList = ({
  accounts,
  onDelete,
  loading,
  setIsShowModal,
  setAccountEdit,
}) => {
  return (
    <>
      <h3>Danh sách Account</h3>
      {!loading ? (
        <Table>
          <thead>
            <tr>
              <thd>#</thd>
              <th>ID</th>
              <th>Email</th>
              <th>User Name</th>
              <th>Full Name</th>
              <th>Deparment</th>
              <th>Position</th>
              <th>Create Date</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((person, index) => (
              <tr key={person.id}>
                <th>{index + 1}</th>
                <th scope="row">{person.id}</th>
                <td>{person.email}</td>
                <td>{person.userName}</td>
                <td>{person.fullName}</td>
                <td>{person.deparment}</td>
                <td>{mapValuePosition[person.position]}</td>
                <td>{new Date(person.createdAt).toLocaleDateString()}</td>
                <td>
                  <Button
                    color="warning"
                    onClick={() => {
                      setIsShowModal(true);
                      setAccountEdit(person);
                    }}
                  >
                    Edit
                  </Button>
                </td>
                <td>
                  <Button color="warning" onClick={() => onDelete(person.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Spinner />
      )}
    </>
  );
};
