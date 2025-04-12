import React from 'react';

const MenuBox = ({menu}) => {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mx-auto max-w-4xl p-10">
                    {menu.map(item => (
                        <div key={item.id} className="flex items-center gap-2">
                            <img style={{borderRadius: '0 200px 200px 200px'}} src={item.image} alt={item.name} className="w-24 h-24  object-cover rounded" />
                           <div>
                           <h3 className="text-md font-semibold mt-2 uppercase">{item.name}--------</h3>
                            <p className="text-gray-500 text-sm">{item.recipe}</p>
                           </div>
                           <p className="text-orange-600 font-bold">${item.price}</p>

                        </div>
                    ))}
                </div>
        </div>
    );
};

export default MenuBox;