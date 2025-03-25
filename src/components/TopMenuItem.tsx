import Link from 'next/link'

export default function TopMenuItem ({title, pageRef} : {title : string, pageRef : string})
{
    return (
        <Link className= "w-full h-full flex justify-center items-center" href ={pageRef}>
            {title}
        </Link>

    );
}