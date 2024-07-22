import bcrypt from 'bcrypt'
import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad} from './$types'
import { db } from '$lib/database'
import { Roles } from '$lib/roles'

export const prerender = true

export const load: PageServerLoad = async (event) => {
  if(event.locals.user) {
    redirect(302, '/')
  }
}

export const actions: Actions = {
  register: async ({ request }) => {
    const data = await request.formData()

    const username = (data.get('username') as string).trim()
    const fullname = (data.get('fullname') as string).trim()
    const email = (data.get('email') as string).trim()
    const address = (data.get('address') as string).trim()
    const phone = (data.get('phone') as string).trim()
    const password = data.get('password')

    console.log(username, fullname, email, address, phone, password)

    // verify user data
    if(
      typeof username !== 'string' ||
      typeof fullname !== 'string' ||
      typeof email !== 'string' ||
      typeof address !== 'string' ||
      typeof phone !== 'string' ||
      typeof password !== 'string' ||
      !username ||
      !fullname ||
      !email ||
      !address ||
      !phone ||
      !password
    ) {
      return fail(400, { invalid: true })
    }

    // username in use
    const usernameExists = await db.user.findUnique({
      where: { username }
    })

    if(usernameExists) {
      return fail(400, { username: true})
    }

    // email in use
    const emailExists = await db.user.findUnique({
      where: { email }
    })

    if(emailExists) {
      return fail(400, { email: true})
    }

    // create user
    await db.user.create({
      data: {
        email: email,
        phone: phone,
        role: { connect: { name: Roles.ADVENTURER } },
        address: address,
        fullName: fullname,
        username: username,
        passwordHash: await bcrypt.hash(password, 12),
        userAuthToken: crypto.randomUUID()
      }
    })
    
    // redirect to avatar page
    throw redirect(303, '/login')
  }
}
