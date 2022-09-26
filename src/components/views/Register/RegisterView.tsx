import { useState } from 'react';
import { appRoutes } from 'src/utils/routes';
import { registerUser, createUserDocFromAuth } from 'src/utils/firebase/firebase';

import { Row } from 'src/assets/Flexbox';
import { Link } from './RegisterViewCSS';
import { Header } from 'src/components/common/AccountHeader/AccountHeader';
import { Input } from 'src/components/common/Input/Input';
import ButtonComponent from 'src/components/common/Button/Button';
import ErrorComponent, { ERROR_TYPES } from 'src/components/common/Error/Error';

const RegisterView = () => {
  const defaultForm = {
    firstName: '' as string,
    lastName: '' as string,
    email: '' as string,
    password: '' as string,
    passwordConfirm: '' as string,
  };

  const errors = {
    valid: true,
    error: '',
  };

  const [formFields, setFormFields] = useState(defaultForm);
  const [matchedPasswords, setMatchedPasswords] = useState(false);
  const [registrationError, setRegistrationError] = useState(errors);
  const { firstName, lastName, email, password, passwordConfirm } = formFields;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetValues = () => {
    setFormFields(defaultForm);
    setRegistrationError({
      valid: true,
      error: '',
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) return;
    if (password !== passwordConfirm) {
      setMatchedPasswords(true);
      return;
    }
    try {
      const resp = await registerUser(email, password);
      const displayName = `${firstName} ${lastName}`;
      await createUserDocFromAuth(resp?.user, { displayName });
      resetValues();
    } catch (e: any) {
      if (e.code.includes('auth/email-already-in-use')) {
        setRegistrationError({
          valid: false,
          error: 'User with given email address is already registered. Please try again.',
        });
      } else {
        setRegistrationError({
          valid: false,
          error: 'Registration was unsuccessful. Please try again.',
        });
      }
      console.log('Registration error:', e);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Row lg={5} justify="center" wrap="wrap" textAlign="center">
        <Header>Create Account</Header>
        <p>
          If you already have an account with us, please login at the{' '}
          <Link to={`${process.env.PUBLIC_URL}${appRoutes.ACCOUNT}`}>login page</Link>.
        </p>
        <Input name="firstName" type="text" placeholder="First Name" required value={firstName} onChange={handleChange} />
        <Input name="lastName" type="text" placeholder="Last Name" required value={lastName} onChange={handleChange} />
        <Input name="email" type="email" placeholder="E-Mail" required value={email} onChange={handleChange} />
        <Input name="password" type="password" placeholder="Password" required value={password} onChange={handleChange} />
        <Input
          name="passwordConfirm"
          type="password"
          placeholder="Password Confirm"
          required
          value={passwordConfirm}
          onChange={handleChange}
        />
        {matchedPasswords && (
          <ErrorComponent errorType={ERROR_TYPES.warning} error={'Your passwords do not match. Please review.'} />
        )}
        {!registrationError.valid && <ErrorComponent errorType={ERROR_TYPES.error} error={registrationError.error} />}
        <ButtonComponent width={450} type="submit" text="Continue" />
        <Link to={`${process.env.PUBLIC_URL}${appRoutes.HOME}`}>Return to Store</Link>
      </Row>
    </form>
  );
};

export default RegisterView;
