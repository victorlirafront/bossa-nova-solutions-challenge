import Card from '@/components/Card/Card';
import CardsWrapper from '@/components/CardsWrapper/CardsWrapper';
import { FAVICON } from '@/constants/images';
import Head from 'next/head';
import axios from 'axios';
import { HomeProps, User } from './types';
import { API_END_POINT } from '@/constants/endpoints';
import { setUsers } from '@/redux/features/users-slice/users-slice';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/redux/store';
import UserAdmin from '@/components/UserAdmin/UserAdmin';
import Modal from '@/components/Modal/Modal';
import AddUserForm from '@/components/UserForm/UserForm';
import { initialUser } from '@/constants/initializers';

export default function Home({ data }: HomeProps) {
  const dispatch = useDispatch();
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(initialUser);
  const userCollection = useAppSelector((state) => state.usersReducer.users);
  const isUserCollectionValid = userCollection.length > 0;

  useEffect(() => {
    if (data.length > 0) {
      dispatch(setUsers(data));
    }
  }, [data, dispatch]);

  const deleteUser = async (userId: string) => {
    try {
      await axios.delete(`${API_END_POINT}/users/${userId}`);
      dispatch(setUsers(userCollection.filter((user) => user.id !== userId)));
    } catch (error) {
      console.error('Erro ao deletar o usuário:', error);
    }
  };

  const updateUser = (user: User) => {
    const updatedUser = { ...user, method: 'PUT' };
    setCurrentUser(updatedUser);
    setShowCreateUserModal(true);
  };

  const closeModalHandler = () => {
    setShowCreateUserModal(false);
    setCurrentUser(initialUser);
  };

  const onOpenAddUserForm = () => {
    setShowCreateUserModal(true);
  };

  return (
    <>
      <Head>
        <title>Bossa Nova Solutions Challenge</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={FAVICON} />
      </Head>

      <Modal className={showCreateUserModal ? 'active' : ''} closeModal={closeModalHandler}>
        <AddUserForm user={currentUser} onCloseModal={closeModalHandler} />
      </Modal>

      <div className="main">
        <CardsWrapper>
          <UserAdmin onOpenAddUserForm={onOpenAddUserForm} />
          <div className="cards-container">
            {!isUserCollectionValid ? (
              <h1 className="title-error">Nenhum usuário foi encontrado</h1>
            ) : (
              [...userCollection].reverse().map((user) => {
                return (
                  <Card
                    id={user.id}
                    onDeleteUser={() => deleteUser(user.id)}
                    onUpdateUser={() => updateUser(user)}
                    username={user.username}
                    key={user.id}
                    state={user.state}
                    score={String(user.score)}
                    occupation={user.occupation}
                  />
                );
              })
            )}
          </div>
        </CardsWrapper>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const response = await axios.get(`${API_END_POINT}/users`);
    const data: User[] = response.data;

    return {
      props: { data },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: { data: [] },
    };
  }
}
