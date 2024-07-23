import { derived, writable } from 'svelte/store';
import { englishLocale } from './english';
import { serbianLocale } from './serbian';

export const LOCALES = {
	ENGLISH: 'en',
	SERBIAN: 'rs'
};

const OBJECT_PROPERTY_SEPARATOR = '.';

export const setupLocalization = (locale: string) => {
  	const labels = writable(locale == LOCALES.ENGLISH ? englishLocale : serbianLocale);

    // TODO: make this work
	// const labels: any = writable(() => {
 //    switch(locale) {
 //      case LOCALES.ENGLISH:
 //        return englishLocale
 //      case LOCALES.SERBIAN:
 //        return serbianLocale
 //    }
 //  });
	let currentLocale = locale;

	const changeLocale = (locale: string) => {
		if (locale == LOCALES.ENGLISH) {
			labels.set(englishLocale);
			currentLocale = locale;
		} else if (locale == LOCALES.SERBIAN) {
			labels.set(serbianLocale);
			currentLocale = locale;
		}
	};

	const getCurrentLocale = () => {
		return currentLocale;
	};

	const translate = (labels: any, key: string) => {
		const path = key.split(OBJECT_PROPERTY_SEPARATOR);
		let current = labels;
		for (let i = 0; i < path.length; i++) {
			current = current[path[i]];
			if (!current) return key;
		}
		return current;
	};

	const i18n = derived(labels, (current: any) => {
		return (key: any) => {
			if (!key.includes(OBJECT_PROPERTY_SEPARATOR)) {
				return current[key] || key;
			}
			return translate(current, key);
		};
	});

	return {
		...i18n,
		changeLocale,
		getCurrentLocale
	};
};

