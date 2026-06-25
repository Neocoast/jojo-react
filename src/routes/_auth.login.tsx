import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { FileText } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';
import { useLoginMutation } from '@/services/authApi';
import { setUser } from '@/services/authSlice';
import { loginSchema, type LoginFormData } from '@/validations/login';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const {
      register,
      handleSubmit,
      resetField,
      watch,
      formState: { errors },
    } = useForm<LoginFormData>({
      mode: 'onSubmit',
      resolver: zodResolver(loginSchema),
    });

  const fields = Object.values(watch());
  const isFormFilled = fields.every(Boolean);
  const hasErrors = Object.keys(errors).length > 0;

  const onSubmitLogin = async (data: LoginFormData) => {
    const { error, data: responseData } = await login({
      email: data.email,
      password: data.password,
    });

    if (error) {
      resetField('password');
      toast.error('Something went wrong. Please try again.');
      return;
    }

    dispatch(setUser(responseData!.data));


    toast.success('Logged in');
    navigate({ to: '/' });
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 md:justify-start md:pl-50">
      <div className="p-6 w-full max-w-112.5 bg-white rounded-xl flex flex-col gap-11">
        <div className="inline-flex items-center gap-1.5">
          <FileText className="size-8 text-primary" />
          <span className="text-primary text-3xl font-medium leading-8">Neoposts</span>
        </div>
        <form className="self-stretch flex flex-col gap-6"  onSubmit={handleSubmit(onSubmitLogin)} >
          <FormField type="email" placeholder="Email" error={errors.email?.message} {...register('email')}/>
          <FormField type="password" placeholder="Password" error={errors.password?.message} {...register('password')} />

          <Button type="submit" disabled={isLoading || !isFormFilled || hasErrors } className="w-full">
            {isLoading ? 'loading...' : 'Login'}
          </Button>
        </form>
      </div>
    </div>
  );
}

export const Route = createFileRoute('/_auth/login')({
  component: LoginPage,
})
