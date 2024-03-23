import { useRef, useState } from 'react';
import { TextInput, View } from 'react-native';
import styled from 'styled-components/native';

import {
  Button,
  Container,
  Footer,
  Form,
  FormField,
  Header,
  Submit,
  Text,
} from 'components';
import { setAuthenticated, useDispatch } from 'store';
import { loginValidationSchema as validationSchema } from 'utils';
import { pallets } from 'constant';

const OrView = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 8px 0;
  width: 100%;
`;

const Line = styled.View`
  background-color: ${pallets.black};
  height: 1px;
  opacity: 0.5;
  width: 40%;
`;

export default function Login(): JSX.Element {
  const [secure, setSecure] = useState(true);
  const dispatch = useDispatch();

  const passwordRef = useRef<TextInput>(null);

  return (
    <>
      <Header title="Login" showCloseIcon />
      <Container>
        <Text size={24} variant="600" style={{ marginBottom: 4 }}>
          Hey, Welcome back{'\n'}to Rydah 👋🏼
        </Text>
        <Form
          {...{ validationSchema }}
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={values => {
            console.log(values);
            dispatch(setAuthenticated(true));
          }}>
          <View style={{ height: 32 }} />
          <FormField
            placeholder="Email"
            name="email"
            keyboardType="email-address"
            autoCorrect={false}
            returnKeyLabel="Next"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
          />
          <FormField
            ref={passwordRef}
            placeholder="Password"
            name="password"
            secureTextEntry={secure}
            returnKeyLabel="Done"
            returnKeyType="done"
            rightIcon={secure ? 'eye' : 'eye-off'}
            onRightIconPress={() => {
              setSecure(sec => !sec);
            }}
          />
          <Footer>
            <Submit label="Login" />
            <OrView>
              <Line />
              <Text>OR</Text>
              <Line />
            </OrView>
            <Button
              variant="outline"
              label="Continue with Apple"
              icon="logo-apple"
            />
          </Footer>
        </Form>
      </Container>
    </>
  );
}
