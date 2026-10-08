import { useState } from 'react';
import { Plus } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { FormField } from '@/components/ui/form-field';
import { TagsCombobox } from '@/components/ui/combobox';
import { useGetTagsQuery } from '@/services/tagsApi';
import { createPostSchema, type CreatePostFormData } from '@/validations/createPosts';
import { useCreatePostMutation } from '@/services/postsApi';
import { showSuccessToast } from '@/components/SuccessToast';
import toast from 'react-hot-toast';

export const CreatePostForm = () => {
  const [createPost, { isLoading }] = useCreatePostMutation();
  const { data: tags = [] }  = useGetTagsQuery();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreatePostFormData>({
    resolver: zodResolver(createPostSchema),
    defaultValues: { title: '', body: '' },
  });

  const title = watch('title');
  const body = watch('body');

  let isFormFilled;
  if (title && body) {
    isFormFilled = true;
  } else {
    isFormFilled = false;
  }

  const clearForm = () => {
    reset();
    setSelectedTags([]);
  };

   const onSubmit = async (data: CreatePostFormData) => {
    const { error } = await createPost({
      title: data.title,
      body: data.body,
      tags: selectedTags,
    });

    if (error) {
      let message = 'Could not create the post. Please try again.';

      // Si la API dice por qué falló ({ errors: ["Title can't be blank"] }), mostramos eso
      if ('data' in error) {
        const responseData = error.data as { errors?: unknown } | undefined;
        const apiErrors = responseData?.errors;

        if (Array.isArray(apiErrors) && apiErrors.length > 0) {
          message = String(apiErrors[0]);
        }
      }

      toast.error(message);
      return;
    }

    showSuccessToast('New Post!', 'Post added successfully');
    clearForm();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full p-4 bg-white rounded-xl flex flex-col gap-3">
    <div>
      <label htmlFor="title" className="sr-only">Title</label>
      <FormField
      id="title"
      placeholder="Title"
      error={errors.title?.message}
      {...register('title')}
      />
    </div>

    <TagsCombobox items={tags.map((tag) => tag.slug)} value={selectedTags} onValueChange={setSelectedTags} placeholder="Tags #" />

    <div>
      <label htmlFor="body" className="sr-only">Body</label>
      <textarea
      id="body"
      placeholder="what´s on your mind?"
      className="w-full h-24 px-3 py-2.5 rounded-md outline-1 -outline-offset-1 outline-input text-base leading-6 placeholder:text-muted-foreground placeholder:font-light resize-y"
      {...register('body')}
      />
      {errors.body && (
        <p className="mt-1 text-destructive text-xs  font-medium">{errors.body.message}</p>
      )}
    </div>

    <div className="flex items-center justify-end gap-2">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button type="button" variant="ghost" className="font-normal text-primary hover:text-primary aria-expanded:text-primary">Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="gap-4 p-6 data-[size=default]:max-w-[calc(100%-2rem)] data-[size=default]:sm:max-w-lg">
          <AlertDialogHeader className="place-items-start text-left">
            <AlertDialogTitle className="text-xl">Do you want to discard this post?</AlertDialogTitle>
            <AlertDialogDescription>Your draft will be lost.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mx-0 mb-0 rounded-none border-t-0 bg-transparent p-0">
            <AlertDialogCancel className="min-w-20 bg-white text-primary leading-6">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={clearForm} className="min-w-20 leading-6">Discard</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Button type="submit" disabled={!isFormFilled || isLoading}>
        <Plus /> Post
      </Button>
    </div>
    </form>
  )
}




