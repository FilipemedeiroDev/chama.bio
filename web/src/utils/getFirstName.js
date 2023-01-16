import { getItem } from '../utils/cookies';

function getFirstName() {
    let name = getItem('name');
    name = name.split(' ');
    const firstName = name[0]
    return firstName
}

export default getFirstName;