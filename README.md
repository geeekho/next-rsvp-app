This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Events rsvps Demo App

## Overview

This project is built with **Next.js 14** and leverages its advanced features for performance, scalability, and enhanced user experience. Key features include server actions, form handling, middleware, authentication, caching strategies, server-side rendering, and much more.

This guide outlines the major features and implementation strategies used in this project.

---

## Features

### 1. **Server Actions / Mutations**
In Next.js 14, **Server Actions** provide a way to run server-side logic (mutations) directly from the client. This eliminates the need for a separate API route in many cases, making data updates and server-side logic execution more seamless.

- **Example usage:**
    ```js
    // app/actions/my-action.js
    'use server'

    export async function myServerAction(inputData) {
        // Handle data on the server
        return { message: 'Action completed' };
    }
    ```

### 2. **Form Actions**
Form actions allow you to submit form data directly to server functions in Next.js. This works seamlessly with the **Server Actions** feature, enabling the handling of form submissions without the need for custom API routes.

- **Example usage:**
    ```jsx
    // app/form-component.js
    'use client'

    import { myServerAction } from './actions/my-action';

    const MyForm = () => {
        const [formState, action] = useFormState<{ message: string | null }>(
            signinUser,
            initialState
        )

        return (
            <form action={action}>
                <input type="text" name="inputField" />
                <button type="submit">Submit</button>
            </form>
        );
    };

    export default MyForm;
    ```

### 3. **Form Hooks**
Custom hooks in Next.js can be used to manage form state, validation, and submission logic in a clean and reusable way.

- **Example usage:**
    ```js
    // components/SubmitButton.js
    import { useFormStatus } from 'react-dom'

    const SubmitButton = ({ label, ...btnProps }: { label: string }) => {
    const { pending } = useFormStatus()
    return (
        <Button {...btnProps} type="submit" isLoading={pending}>
        {label}
        </Button>
    )
    }

    export default SubmitButton

    ```

### 4. **Transition Hooks**
With React's **useTransition** hook, you can manage animations and transitions between different states or pages in your Next.js app, improving the user experience during navigation.

- **Example usage:**
    ```jsx
    import { useTransition } from 'react';

    const ComponentWithTransition = () => {
        const [isPending, startTransition] = useTransition();

        const handleClick = () => {
            startTransition(() => {
                // Trigger transition or state change
            });
        };

        return (
            <button onClick={handleClick}>
                {isPending ? 'Loading...' : 'Click me'}
            </button>
        );
    };
    ```

### 5. **Middleware**
Middleware in Next.js 14 allows you to intercept requests before they reach your page or API routes. This is useful for handling tasks like authentication, logging, or data transformation.

- **Example usage:**
    ```js
    // middleware.js
    export function middleware(req) {
        // Custom middleware logic, e.g., checking if a user is authenticated
        if (!req.cookies.authenticated) {
            return new Response('Unauthorized', { status: 401 });
        }
        return NextResponse.next();
    }
    ```

### 6. **Auth Protection**
Next.js allows you to protect routes with custom authentication checks in middleware or using edge functions to ensure only authenticated users can access certain pages or actions.

- **Example usage:**
    ```js
    // middleware.js
    export function middleware(req) {
        const token = req.cookies.get('authToken');
        if (!token) {
            return new Response('Unauthorized', { status: 401 });
        }
        return NextResponse.next();
    }
    ```

### 7. **Server Components Data Fetching**
In **Next.js 14**, Server Components can be used to fetch data server-side and send it to the client in a more optimized manner. This reduces the need for additional client-side fetching and SSR.

- **Example usage:**
    ```js
    // app/page.js
    import { getData } from './lib/data';

    export default async function Page() {
        const data = await getData();
        return (
            <div>
                <h1>{data.title}</h1>
            </div>
        );
    }
    ```

### 8. **Caching Server Components Data**
You can cache the data fetched from server components to avoid redundant server calls, thus improving performance.

- **Example usage:**
    ```js
    // utils/user.ts
    import 'server-only'
    import { COOKIE_NAME } from './constants'
    import { cookies } from 'next/headers'
    import { redirect } from 'next/navigation'
    import { getUserFromToken } from './authTools'
    import { cache } from 'react'

    export const getCurentUser = cache(async () => {
    const token = cookies().get(COOKIE_NAME)
    if (!token) redirect('/signin')
    const user = await getUserFromToken(token)
    if (!user) redirect('/signin')
    return user
    })
    ```

### 9. **Memoizing Server-Side Data Calls**
Memoization helps avoid redundant data fetching by caching results and reusing them for the same request.

- **Example usage:**
    ```ts
    import 'server-only'
    import { db } from '@/db/db'
    import { memoize } from 'nextjs-better-unstable-cache'

    export const getOneEvent = memoize(
    async (userId: string, eventId: string) => {
        await delay()
        return db.query.events.findFirst({
        where: and(eq(events.id, eventId), eq(events.createdById, userId)),
        })
    },
    {
        persist: true,
        revalidateTags: (userId, eventId) => ['event', eventId],
        suppressWarnings: true,
        logid: 'event',
    }
    )
    ```

### 10. **Cache Revalidation**
Revalidating cache ensures that the cached data stays up-to-date, allowing your application to serve fresh data when needed without unnecessary fetching.

- **Example usage:**
    ```js
    // actions/events.ts
    'use server'
    import { revalidateTag } from 'next/cache'

    export const createNewEvent = async () => {
    await delay(2000)
    const user = await getCurentUser()

    await db.insert(events).values({
        createdById: user.id,
        startOn: new Date().toUTCString(),
        name: randomName('event', ' '),
    })
    revalidateTag('events')
    }
    ```

### 11. **Streaming and Suspense**
Next.js 14 supports React's **Suspense** and **Streaming** features, enabling you to progressively load content, reducing the time to first byte (TTFB) and improving the user experience.

- **Example usage:**
    ```js
        // loading.tsx
        import { Spinner } from '@nextui-org/react'

        export default function Loading() {
        return (
            <div className="w-full min-h-screen flex items-center justify-center">
            <Spinner>Loading...</Spinner>
            </div>
        )
        }
    ```

### 12. **Error Handling**
Error handling in Next.js can be done through custom error pages or within your components using try-catch blocks to manage and display errors gracefully.

- **Example usage:**
    ```tsx
        // error.tsx
        'use client'
        // must be client component will be caught at
        // runtime with error boundries
        const DashboardError = ({ error, reset }: { error: any; reset: any }) => {
        return (
            <div>
            <h2>Something bad happened :( </h2>
            <button onClick={() => reset()}>Try again</button>
            </div>
        )
        }
        export default DashboardError
    ```

### 13. **Parallel Routing**
Next.js 14 supports **Parallel Routes** that allow multiple routes to be loaded in parallel, improving page load times and user experience.
```
app/
├── dashboard/
│   ├── page.tsx
│   ├── layout.tsx
│   └── @events/
│       ├── default.tsx
│       ├── page.tsx
│       └── loading.tsx
│   └── @rsvps/
│   ├── default.tsx
│   ├── page.tsx
│   └── loading.tsx
├──
```
- **Example usage:**
    ```jsx
    // app/dashboard/layout.tsx
    const DashboardLayout = ({
    children,
    events,
    rsvps,
    }: Readonly<{
    children: React.ReactNode
    events: React.ReactNode
    rsvps: React.ReactNode
    }>) => {
    const path = usePathname()
    return (
        <Shell>
            <div className="flex w-full h-full">
            <div className="w-1/2 border-r border-default-50">{rsvps}</div>
            <div className="w-1/2 flex flex-col">
                <div className="border-b border-default-50 w-full h-1/2">
                {events}
                </div>
                <div className="w-full h-1/2">{children}</div>
            </div>
            </div>
        </Shell>
    )
    }
    export default DashboardLayout
    ```

### 14. **Route Matching**
With **Dynamic Routes** and **Catch-All Routes** in Next.js, you can implement flexible routing logic to match URLs and render the appropriate components.

- **Example usage:**
    ```js
    // app/products/[id].js
    export default async function ProductPage({ params }) {
        const product = await getProductById(params.id);
        return (
            <div>
                <h1>{product.name}</h1>
                {/* Display product details */}
            </div>
        );
    }
    ```

---

## Setup

### 1. Install Dependencies

```bash
npm install




## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
