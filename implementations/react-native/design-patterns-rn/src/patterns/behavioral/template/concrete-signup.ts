import { FormTemplate } from './abstract-class';

export class SignupFlow extends FormTemplate {
  protected validate(data: Record<string, any>) {
    if (!data.email) throw new Error('Email is required');
    if (!data.password) throw new Error('Password is required');
    return {
      email: String(data.email).trim().toLowerCase(),
      password: data.password,
    };
  }

  protected async send(cleanData: Record<string, any>) {
    console.log('[Signup] sending to server:', cleanData);
    return {
      userId: 'user_' + Math.random().toString(36).slice(2),
      email: cleanData.email,
    };
  }

  protected async afterSuccess(result: any) {
    console.log('[Signup] analytics event for user', result.userId);
  }

  protected successMessage(result: any) {
    return `Welcome, ${result.email}! Your account is ready.`;
  }
}
