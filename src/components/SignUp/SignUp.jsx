import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { signUp } from '../../features/userSlice';
import './SignUp.scss';

const SignUp = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data) => {
    dispatch(
      signUp({
        email: data.email,
        username: data.username,
        password: data.password,
      })
    );
  };

  if (user.user.token) {
    return <Redirect to="/" />;
  }

  return (
    <form className="small-container sign-up" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="title sign-up__title">Create new account</h2>

      <p className="sign-up__subtitle subtitle">Username</p>
      <div className="sign-up__container-input-with-error">
        <input
          type="text"
          className={`input ${errors.username ? 'errorInp': ""}`}
          {...register('username', {
            required: true,
            minLength: { value: 3, message: 'Username must be at least 3 characters long' },
            maxLength: { value: 20, message: 'Username must not exceed 20 characters' },
            onChange: (e) => setValue('username', e.target.value.toLowerCase()),
          })}
          placeholder="Username"
        />
        {user.errors.username && <p className="sign-up__error-message">{user.errors.username}</p>}
      </div>

      <p className="sign-up__subtitle subtitle">Email address</p>
      <div className="sign-up__container-input-with-error" >
        <input
          type="email"
          className={`input ${errors.email ? 'errorInp': ""}`}
          {...register('email', {
            required: true,
            onChange: (e) => setValue('email', e.target.value.toLowerCase()),
          })}
          placeholder="Email address"
        />
        {user.errors.email && <p className="sign-up__error-message">{user.errors.email}</p>}
      </div>

      <p className="sign-up__subtitle subtitle">Password</p>
      <div className={`sign-up__container-input-with-error `}>
        <input
          type="password"
          className={`input ${errors.password ? 'errorInp': ""}`}
          {...register('password', {
            required: true,
            minLength: { value: 6, message: 'Your password needs to be at least 6 characters' },
            maxLength: { value: 40, message: 'Your password must not be more than 40 characters long' },
          })}
          placeholder="Password"
        />
        {errors.password && <p className="sign-up__error-message">{errors.password.message}</p>}
      </div>


      <p className="sign-up__subtitle subtitle">Repeat Password</p>
      <div className="sign-up__container-input-with-error">
        <input
          type="password"
          className={`input ${errors.confirmPassword ? 'errorInp': ""}`}
          {...register('confirmPassword', {
            required: true,
            validate: (value) => value === watch('password') || 'Passwords must match',
          })}
          placeholder="Repeat Password"
        />
        {errors.confirmPassword && <p className="sign-up__error-message">{errors.confirmPassword.message}</p>}
      </div>

      <div className="sign-up__access-to-personal-information">
        <input
          className="sign-up__access-to-personal-information-checkbox"
          id="access"
          type="checkbox"
          {...register('checkbox', { required: true })}
        />
        <label htmlFor="access" className="sign-up__access-to-personal-information-text">
          I agree to the processing of my personal information
        </label>
      </div>

      <button type="submit" className="button sign-up__button">Create</button>
      {user.errors.signUpError && (
        <p className="sign-up__error-message sign-up__error-message-on-button">{user.errors.signUpError}</p>
      )}
      <p className="sign-up__have-an-account-text">
        Already have an account? <Link to="/sign-in">Sign In</Link>.
      </p>
    </form>
  );
};

export default SignUp;
