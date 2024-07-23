import type { Handle } from '@sveltejs/kit'
import { db } from '$lib/database'
import { LOCALES } from '$lib/locale/i18n';

type Locale = typeof LOCALES[keyof typeof LOCALES];

export const handle: Handle = async ({ event, resolve }) => {

  // language
  const locale = event.cookies.get('locale');

  if(locale && Object.values(LOCALES).includes(locale as Locale)) {
      event.locals.locale = locale;
  } else {
		event.cookies.set('locale', LOCALES.SERBIAN, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production'
		});
		event.locals.locale = LOCALES.SERBIAN;
  }

  const session = event.cookies.get('session');
  
  if(!session) {
    return await resolve(event);
  }

  const user = await db.user.findUnique({
    where: {
      userAuthToken: session
    },
    select: {
      username: true,
      email: true,
      role: true
    }
  });

  if(user) {
    event.locals.user = {
      username: user.username,
      email: user.email,
      role: user.role.name
    }
  }

  return await resolve(event);
}
