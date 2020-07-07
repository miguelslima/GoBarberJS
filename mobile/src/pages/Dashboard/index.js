import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';

import api from '../../services/api';

import Background from '../../components/Background';
import Appointment from '../../components/Appointment';

import { Container, Title, List, TitleWelcome } from './styles';

function Dashboard({ isFocused }) {
  const [appointments, setAppointments] = useState([]);

  const name = useSelector((state) => state.user.profile.name);

  useEffect(() => {
    async function loadAppointments() {
      const response = await api.get('appointments');

      setAppointments(response.data);
    }

    loadAppointments();
  }, []);

  useEffect(() => {}, [isFocused]);

  async function handleCancel(id) {
    const response = await api.delete(`appointments/${id}`);

    setAppointments(
      appointments.map((appointment) =>
        appointment.id === id
          ? {
              ...appointment,
              canceled_at: response.data.canceled_at,
            }
          : appointment
      )
    );
  }

  return (
    <Background>
      <Container>
        <Title>Agendamentos</Title>
        <TitleWelcome>Seja bem vindo(a) {name} </TitleWelcome>
        <List
          data={appointments}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Appointment onCancel={() => handleCancel(item.id)} data={item} />
          )}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Agendamentos',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="event" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Dashboard);
