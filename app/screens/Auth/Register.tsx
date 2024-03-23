import { useRef, useState } from 'react';
import { TextInput, View } from 'react-native';

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
import { AuthRoutes, StackNavigationProps } from 'navigation';
import { setAuthenticated, useDispatch } from 'store';
import { registerValidationSchema as validationSchema } from 'utils';

export default function Register({
  navigation,
}: StackNavigationProps<AuthRoutes, 'Register'>): JSX.Element {
  const [secure, setSecure] = useState(true);
  const dispatch = useDispatch();

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  return (
    <>
      <Header hideLeftComp title="Register" />
      <Container>
        <Text>Enter your email</Text>
        <Form
          {...{ validationSchema }}
          initialValues={{
            email: '',
            name: '',
            password: '',
          }}
          onSubmit={values => {
            console.log(values);
            dispatch(setAuthenticated(true));
          }}>
          <View style={{ height: 32 }} />
          <FormField
            name="name"
            placeholder="Name"
            onSubmitEditing={() => emailRef.current?.focus()}
            autoCapitalize="none"
            autoCorrect
            returnKeyLabel="Next"
            returnKeyType="next"
          />
          <FormField
            ref={emailRef}
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
          <View style={{ height: 32 }} />
          <Footer>
            <Submit label="Sign Up" />
            <Button
              variant="transparent"
              label="Already have an account? Log in"
              onPress={() => navigation.navigate('Login')}
            />
          </Footer>
        </Form>
      </Container>
    </>
  );
}
