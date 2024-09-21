import Link from "next/link";


function Sidebar() {
    return(
        <>
            <ul className="list-unstyled">
                <li>
                    <Link href={'/products'} >Get All Products</Link>
                </li>
                <li>
                    <Link href={'/categories'}>Get All Categories</Link>
                </li>
            </ul>
        </>
    )
}

export default Sidebar;