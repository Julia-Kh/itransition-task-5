import { faker } from '@faker-js/faker';


const randomHeight = () => Math.floor(Math.random() * 30 + 24)

const generateRandomItems = (count) => {
    return Array.from({ length: count }).map((_, i) => ({
        text: `Item ${i + 1}`,
        height: randomHeight(),
        longText: faker.lorem.paragraphs(1),
    }))
}

const generated = []

export function toggleBg(index) {
    return index % 2 ? '#f5f5f5' : 'white'
}

function address() {
    const randomAddress = {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        country: faker.location.country(),
    };

    // Combine address components into one string
    const fullAddress = `${randomAddress.street}, ${randomAddress.city}, ${randomAddress.state} ${randomAddress.zipCode}, ${randomAddress.country}`;
    return fullAddress
}

export function user(index = 0) {

    return {
        index: index + 1,
        bgColor: toggleBg(index),
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

const userSorter = (a, b) => {
    if (a.name < b.name) {
        return -1
    }
    if (a.name > b.name) {
        return 1
    }
    return 0
}

export function generateUsers(length, startIndex = 0) {
    return Array.from({ length }).map((_, i) => getUser(i + startIndex))
}

const range = (len) => {
    const arr = []
    for (let i = 0; i < len; i++) {
        arr.push(i)
    }
    return arr
}

const newPerson = () => {
    const statusChance = Math.random()
    return {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        age: Math.floor(Math.random() * 30),
        visits: Math.floor(Math.random() * 100),
        progress: Math.floor(Math.random() * 100),
        status: statusChance > 0.66 ? 'relationship' : statusChance > 0.33 ? 'complicated' : 'single',
    }
}

export function makeData(...lens) {
    const makeDataLevel = (depth = 0) => {
        const len = lens[depth]
        return range(len).map((d) => {
            return {
                ...newPerson(),
                subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
            }
        })
    }

    return makeDataLevel()
}
