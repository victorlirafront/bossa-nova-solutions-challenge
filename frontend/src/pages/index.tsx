import Card from '@/components/Card/Card';
import CardsWrapper from '@/components/CardsWrapper/CardsWrapper';
import { FAVICON } from '@/constants/images';
import Head from 'next/head';
import axios from 'axios';
import { HomeProps, User } from './types';
import { API_END_POINT } from '@/constants/endpoints';
import { setUsers } from '@/redux/features/users-slice/users-slice';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/redux/store';

export default function Home({ data }: HomeProps) {
  const dispatch = useDispatch();
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

  return (
    <>
      <Head>
        <title>Bossa Nova Solutions Challenge</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={FAVICON} />
      </Head>
      <div className="main">
        <CardsWrapper>
          {!isUserCollectionValid ? (
            <h1 style={{ color: 'red' }}>Houve um erro ao buscar os usuários</h1>
          ) : (
            userCollection.map((user) => {
              return (
                <Card
                  onDeleteUser={() => deleteUser(user.id)}
                  username={user.username}
                  key={user.id}
                  state={user.state}
                  score={user.score}
                  occupation={user.occupation}
                />
              );
            })
          )}
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
