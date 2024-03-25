import * as Yup from 'yup';

const passwordRegExr = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{5,}$/;

const password = Yup.string()
  .matches(
    passwordRegExr,
    'Password must contain at least 5 characters, including Upper/lower case and numbers',
  )
  .required('Please enter your password')
  .min(8, 'Password must be at least 8 characters long')
  .label('Password');

const email = Yup.string()
  .required('Please enter your email')
  .email('Email is invalid')
  .label('Email');

const name = Yup.string()
  .required('Please input your legal full name')
  .min(2, 'Name must be at least 2 digits long')
  .label('Name');

export const loginValidationSchema = Yup.object().shape({
  email,
  password,
});

export const registerValidationSchema = Yup.object().shape({
  email,
  name,
  password,
});

export const sellValidationSchema = Yup.object().shape({
  category: Yup.object().required('Select a category').label('Category'),
  description: Yup.string()
    .required('Please enter a description')
    .label('Description'),
  imageUrl: Yup.string().required('Select an image to upload').label('Image'),
  name: Yup.string().required('Enter a name').label('Name'),
  price: Yup.string().required('Set item price').label('Price'),
  sellerLocation: Yup.object().required('Select a location').label('Location'),
});
