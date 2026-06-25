import { useState } from 'react';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { FileText } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';
import { TagsCombobox } from '@/components/ui/combobox';
import { useSignupMutation } from '@/services/authApi';
import { useGetTagsQuery } from '@/services/tagsApi';
import { signupSchema, type SignupFormData } from '@/validations/signup';

const SignupPage = () => {
  const navigate = useNavigate();
  const [signup, { isLoading }] = useSignupMutation();
  const { data: tags = [] } = useGetTagsQuery();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    resetField,
    setError,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>({
    mode: 'onSubmit',
    resolver: zodResolver(signupSchema),
  });

  const fields = Object.values(watch());
  const isFormFilled = fields.every(Boolean);
  const hasErrors = Object.keys(errors).length > 0;

  const onSubmitSignup = async (data: SignupFormData) => {
    const { error } = await signup({
      email: data.email,
      name: data.name,
      password: data.password,
      password_confirmation: data.password_confirmation,
      tags: selectedTags,
    });

    if (error) {
      resetField('password');
      resetField('password_confirmation');
      if ((error as any).data?.errors?.email) {
        setError('email', { type: 'server', message: 'Email is already in use' });
      } else {
        toast.error('Something went wrong. Please try again.');
      }
      return;
    }

    toast.success('Account created');
    navigate({ to: '/' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 md:justify-start md:pl-50">
      <div className="p-6 w-full max-w-112.5 bg-white rounded-xl flex flex-col gap-11">
        <div className="inline-flex items-center gap-1.5">
          <FileText className="size-8 text-primary" />
          <span className="text-primary text-3xl font-medium leading-8">Neoposts</span>
        </div>
        <form className="self-stretch flex flex-col gap-6" onSubmit={handleSubmit(onSubmitSignup)}>
          <FormField type="text" placeholder="Name" error={errors.name?.message} {...register('name')} />
          <FormField type="email" placeholder="Email" error={errors.email?.message} {...register('email')} />
          <FormField type="password" placeholder="Password" error={errors.password?.message} {...register('password')} />
          <FormField type="password" placeholder="Password Confirmation" error={errors.password_confirmation?.message} {...register('password_confirmation')} />

          <TagsCombobox items={tags.map((t) => t.slug)} onValueChange={setSelectedTags} />

          <Button type="submit" disabled={isLoading || !isFormFilled || hasErrors} className="w-full">
            {isLoading ? 'Creating account...' : 'Sign Up'}
          </Button>

        </form>
        <div>
          <p className="text-sm text-black">
            Already have an account?{' '}
            <Link to="/login" className="text-black underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute('/signup')({
  component: SignupPage,
});
