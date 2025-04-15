import { useEffect, useState } from 'react';

const useMenu = (category) => {
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/menu')
            .then(res => res.json())
            .then(data => {
                const filteredMenu = category
                    ? data.filter(item => item.category === category)
                    : data;

                setMenu(filteredMenu);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching menu:', error);
                setLoading(false);
            });
    }, [category]);

    return [menu, loading];
};

export default useMenu;
