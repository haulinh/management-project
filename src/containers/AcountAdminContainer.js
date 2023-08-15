import { Button, Modal } from "reactstrap";
import { AccountList } from "../components/AccountList";
import { useEffect, useState } from "react";
import { FormAccount } from "../components/FormAccount";
import axios from "axios";

const URL_API_ACCOUNTS = `https://64c7a27aa1fe0128fbd50f0a.mockapi.io/accounts`;

export const AccountAdminContainer = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [accountEdit, setAccountEdit] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await axios.get(URL_API_ACCOUNTS);
      setLoading(false);
      setAccounts(response.data);
    };

    fetchData();
  }, []);

  const handleToggle = () => {
    setAccountEdit({})
    setIsShowModal(!isShowModal);
  };

  const handleClickCreate = () => {
    setIsShowModal(true);
  };

  const handleSubmit = async (values) => {
    if (accountEdit.id) {
      const res = await axios.put(`${URL_API_ACCOUNTS}/${accountEdit.id}`, values);
      const newAccounts = accounts.map((account) => {
        if (account.id === accountEdit.id) {
          return res.data;
        }

        return account;
      });
      setAccounts(newAccounts)

    } else {
      const res = await axios.post(URL_API_ACCOUNTS, values);
      setAccounts([...accounts, res.data]);
      setIsShowModal(false);
    }
    setIsShowModal(false)
  };

  const handleDelete = async (id) => {
    setLoading(true);
    await axios.delete(`${URL_API_ACCOUNTS}/${id}`);
    setLoading(false);
    const newAccounts = accounts.filter((account) => account.id !== id);
    setAccounts(newAccounts);
  };

  return (
    <div>
      <Button color="primary" onClick={handleClickCreate}>
        Create New Account
      </Button>
      <AccountList
        accounts={accounts}
        onDelete={handleDelete}
        loading={loading}
        setIsShowModal={setIsShowModal}
        setAccountEdit={setAccountEdit}
      />
      <Modal isOpen={isShowModal} toggle={handleToggle}>
        <FormAccount
          onToggle={handleToggle}
          onSubmit={handleSubmit}
          accountEdit={accountEdit}
          setAccountEdit={setAccountEdit}
        />
      </Modal>
    </div>
  );
};
