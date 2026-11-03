import Link from 'next/link';

interface Category{
    _id: string,
    title: string, 
    slug: string,
    description: string,
    icon: string, 
    count: string,
    imageUrl: string
}

const FooterCats = async() => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/categories`)
    const categories = await res.json()
    return (
        <ul className="space-y-2.5 text-sm">
            {
                categories.map((cat:Category) => 
                <li key={cat._id}>
                    <Link href={`/studios?category=${cat.slug}`} className="hover:text-white transition-colors">
                        {cat.title}
                    </Link>
                </li>
                )
            }
        </ul>
    );
};

export default FooterCats;