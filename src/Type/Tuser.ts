interface User {
  _id: string;
  username: string;
  email: string;
  image: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
  dateOfBirthDay: string; // Optional if you want to split date of birth
  dateOfBirthMonth: string; // Optional if you want to split date of birth
  dateOfBirthYear: string; // Optional if you want to split date of birth
  phoneNumber: string;
  address: string;
  role: string;
}
export default User;