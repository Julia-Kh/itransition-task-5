import { fakerEN_CA, fakerDE_AT, fakerPT_PT } from '@faker-js/faker';

const locales = {
    'de_AT': { title: 'Austria', lib: fakerDE_AT },
    'en_CA': { title: 'Canada', lib: fakerEN_CA },
    'pt_PT': { title: 'Portugal', lib: fakerPT_PT },
}

export const availableLocales = Object.entries(locales).map(([key, value]) => ({ title: value.title, value: key }))
// const faker = fakerRU

const generated = []
const generatedSettings = {}

function address(faker) {
    const randomAddress = {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.county(),
        zipCode: faker.location.zipCode(),
        country: faker.location.country(),
    };

    // Combine address components into one string
    const fullAddress = `${randomAddress.street}, ${randomAddress.city}`;
    return fullAddress
}

function user(index = 0, faker) {

    return {
        index: index + 1,
        name: faker.person.fullName(),
        phone: faker.phone.number(),
        address: address(faker),
        id: faker.string.uuid(),
    }
}

const getUser = (index, faker) => {
    if (!generated[index]) {
        generated[index] = user(index, faker)
    }

    return generated[index]
}


export function generateUsers(length, startIndex = 0, settings) {
    if (JSON.stringify(settings) !== JSON.stringify(generatedSettings)) {
        console.log('changing settings', settings, generatedSettings)

        for (const [key, value] of Object.entries(settings)) {
            generated.length = 0
            generatedSettings[key] = value;
        }

    }

    const faker = locales[settings.region].lib;
    faker.seed(settings.seed + startIndex);

    return Array.from({ length }).map((_, i) => getUser(i + startIndex, faker))
}
