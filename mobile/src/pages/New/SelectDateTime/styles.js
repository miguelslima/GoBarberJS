import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const HourList = styled.FlatList.attrs({
  numColumns: 2,
  showsVerticalScrollIndicator: false,
})`
  padding: 0 20px;
`;

export const Hour = styled(TouchableOpacity)`
  background: #fff;
  border-radius: 4px;
  padding: 20px;
  flex: 1;
  opacity: ${(props) => (props.enabled ? 1 : 0.4)};
  align-items: center;
  margin: 0 10px 20px;
`;

export const Title = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #333;
`;
