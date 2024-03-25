import { useRef, useState } from 'react';
import { TextInput, View } from 'react-native';

import { AltLogin } from './Components';

import {
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
            <AltLogin />
          </Footer>
        </Form>
      </Container>
    </>
  );
}
