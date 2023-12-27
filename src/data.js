import { fakerEN, fakerAF_ZA, fakerRU, fakerTR, fakerFR, fakerKA_GE } from '@faker-js/faker';

export const locales = {
    'ru': 'Russia',
    'ge': 'Georgia',
    'fr': 'France',
}


const faker = fakerRU
faker.seed(1234);

const generated = []

function address() {
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

export function user(index = 0) {

    return {
        index: index + 1,
        name: faker.person.fullName(),
        phone: faker.phone.number(),
        address: address(),
        id: faker.string.uuid(),
    }
}

export const getUser = (index) => {
    if (!generated[index]) {
        generated[index] = user(index)
    }

    return generated[index]
}


export function generateUsers(length, startIndex = 0, seed, region, errors) {
    return Array.from({ length }).map((_, i) => getUser(i + startIndex))
}
