import React from 'react';
import { SimpleForm } from './simple-form';
import { SignupFlow } from '../concrete-signup';

export function SignupPage() {
  return (
    <SimpleForm
      title="Sign up"
      flow={new SignupFlow()}
      fields={[
        { name: 'email', label: 'Email', placeholder: 'you@example.com' },
        { name: 'password', label: 'Password', type: 'password' },
      ]}
    />
  );
}
