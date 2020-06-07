import Cookies from 'universal-cookie';

    const cookies = new Cookies();
    const config = {
        headers: { Authorization: `Bearer ${cookies.get('UserData')}` }
    };

export default config;