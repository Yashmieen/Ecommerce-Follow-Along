import Card from "./card";


const Product = () => {
    const products = [
        {
            id: 1,
            name: 'Plum 3% Niacinamide & Rice Water Face Toner',
            price: 4.59,
            image: 'https://m.media-amazon.com/images/I/413WlRMZJmL.jpg',
        },
        {
            id: 2,
            name: 'The Ordinary Multi-Peptide Serum for Hair Density',
            price: 15.56,
            image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTWgBEnGx1dJrOvspLXRljAWRqjtZMQ8WfGgBdY1gfGnJkXyMcxsmS21Yi8L1pdhLKy8SSB9BRrP4Ih1ff37ug0To94AaIUBDO5BNva8c5z25wNdYvav9WYEmM',
        },
        {
            id: 3,
            name: 'The Derma Co 1% Hyaluronic Sunscreen Aqua Gel',
            price: 5.18,
            image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQYb_P0RSIx_qzuZXyulWN0O0a4znak_XMr5KdwocnsHdSb4AMI0geN0ppwZAFq1J0dkrSiMR4tZO9c-lCtZq3fIsFTMg6tY3I3vVM_kBD79AavNR1qgswnbQw',
        },
        {
            id: 4,
            name: 'Sugar Nothing Else Matter Longwear Lipstick',
            price: 6.01,
            image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRyKkO8tXZhQL47anEhB77TEeE3CDDoY9ZxW1aLF54zOl9eLydQ-uxqkzFcYNsJDAD7_HI5pJBYK2ag8bhW1BYfOpGdVdO5SQRGyRm25yqVtuvCx-TrIXBB',
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-r from-pink-400 via-pink-100 to-pink-300 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
  
            <h1 className="text-5xl font-bold text-center text-black mb-10">Our Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <Card
                        key={product.id}
                        name={product.name}
                        price={product.price}
                        image={product.image}
                    />
                ))}
            </div>
        </div>

    )
}

export default Product
