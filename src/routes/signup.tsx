import { useState } from 'react';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { FileText } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { Button } from '../components/ui/button';
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from '../components/ui/combobox';
import { useGetTagsQuery, useSignupMutation } from '../services/authApi';

const signupSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Name is required')
      .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Invalid email format'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Must include at least one uppercase letter')
      .regex(/[a-z]/, 'Must include at least one lowercase letter')
      .regex(/[0-9]/, 'Must include at least one number')
      .regex(/[^a-zA-Z0-9]/, 'Must include at least one special character'),
    password_confirmation: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Passwords do not match',
    path: ['password_confirmation'],
  });

type SignupFormData = z.infer<typeof signupSchema>;

function SignupPage() {
  const navigate = useNavigate();
  const [signup, { isLoading }] = useSignupMutation();
  const { data: tags = [] } = useGetTagsQuery();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const anchor = useComboboxAnchor();

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
          <div className="relative">
            <div className="px-3 py-2.5 rounded-md outline-1 outline-offset -outline-input- flex items-center overflow-hidden">
              <input
                type="text"
                placeholder="Name"
                className="flex-1 text-sm leading-5 bg-transparent outline-none placeholder:text-muted-foreground"
                {...register('name')}
              />
            </div>
            {errors.name && <p className="absolute top-full left-0 mt-1 text-destructive text-xs font-medium">{errors.name.message}</p>}
          </div>
          <div className="relative">
            <div className="px-3 py-2.5 rounded-md outline-1 outline-offset -outline-input- flex items-center overflow-hidden">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 text-sm leading-5 bg-transparent outline-none placeholder:text-muted-foreground"
                {...register('email')}
              />
            </div>
            {errors.email && <p className="absolute top-full left-0 mt-1 text-destructive text-xs font-medium">{errors.email.message}</p>}
          </div>

          <div className="relative">
            <div className="px-3 py-2.5 rounded-md outline-1 outline-offset -outline-input- flex items-center overflow-hidden">
              <input
                type="password"
                placeholder="Password"
                className="flex-1 text-sm leading-5 bg-transparent outline-none placeholder:text-muted-foreground"
                {...register('password')}
              />
            </div>
            {errors.password && <p className="absolute top-full left-0 mt-1 text-destructive text-xs font-medium">{errors.password.message}</p>}
          </div>

          <div className="relative">
            <div className="px-3 py-2.5 rounded-md outline-1 outline-offset -outline-input- flex items-center overflow-hidden">
              <input
                type="password"
                placeholder="Password Confirmation"
                className="flex-1 text-sm leading-5 bg-transparent outline-none placeholder:text-muted-foreground"
                {...register('password_confirmation')}
              />
            </div>
            {errors.password_confirmation && (
              <p className="absolute top-full left-0 mt-1 text-destructive text-xs font-medium">{errors.password_confirmation.message}</p>
            )}
          </div>

          <Combobox
            multiple
            autoHighlight
            items={tags.map((t) => t.slug)}
            onValueChange={(slugs: string[]) => {
              setSelectedTags(slugs);
            }}
          >
            <ComboboxChips ref={anchor} className="w-full rounded-md px-3 py-2.5 min-h-0">
              <ComboboxValue>
                {(values: string[]) => (
                  <>
                    {values.map((value) => (
                      <ComboboxChip key={value}>{value}</ComboboxChip>
                    ))}
                    <ComboboxChipsInput placeholder="Select tags" />
                  </>
                )}
              </ComboboxValue>
            </ComboboxChips>
            <ComboboxContent anchor={anchor}>
              <ComboboxEmpty>No tags found.</ComboboxEmpty>
              <ComboboxList>
                {(slug: string) => (
                  <ComboboxItem key={slug} value={slug}>
                    {slug}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>

          <Button type="submit" disabled={isLoading || !isFormFilled} className="w-full">
            {isLoading ? 'Creating account...' : 'Sign Up'}
          </Button>

        </form>
        <div>
          <p className="text-sm text-black">
            Already have an account?{' '}
            <Link to="/login" className="text-black  underline">
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
