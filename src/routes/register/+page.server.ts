import { db } from '$lib/database'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
}

export const actions: Actions = {
  register: async ({ request }) => {
    const data = await request.formData()

    const username = data.get('username')
    const fullname = data.get('fullname')
    const email = data.get('email')
    const address = data.get('address')
    const phone = data.get('phone')
    const password = data.get('password')

    console.log(username, fullname, email, address, phone, password)

    //TODO: verify user data
    // username in use
    // email in use

    // create user
    
    // redirect to avatar page
  }
}
