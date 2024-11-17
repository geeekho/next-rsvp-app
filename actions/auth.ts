'use server'
import { cookies } from 'next/headers'
import { signin, signup } from '@/utils/authTools'
import { z } from 'zod'
import { redirect } from 'next/navigation'
import { COOKIE_NAME } from '@/utils/constants'

const authSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, 'Password must contain at least 8 characters')
    .max(32, 'Password must not0exceed 32 characters'),
})

export const registerUser = async (prevState: any, formData: FormData) => {
  try {
    const data = authSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    })
    const { token } = await signup(data)
    cookies().set(COOKIE_NAME, token)
  } catch (e: any) {
    console.error(e)
    return {
      message: e.errors ? e.errors[0]?.message : 'Failed to sign you up.',
    }
  }
  redirect('/dashboard')
}

export const signinUser = async (prevState: any, formData: FormData) => {
  try {
    const data = authSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    })

    const { token } = await signin(data)
    cookies().set(COOKIE_NAME, token)
  } catch (e: any) {
    console.error(e)
    return {
      message: e.errors ? e.errors[0]?.message : 'Failed to sign you in.',
    }
  }
  redirect('/dashboard')
}

export const signOutUser = async () => {
  cookies().delete(COOKIE_NAME)
  redirect('/signin')
}
