import Link from 'next/link';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 text-foreground ${className}`}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary"
      >
        <path
          d="M12,4C9.53,5.33,7.39,6.67,6.34,8.02C5.29,9.67,5.29,14.33,6.34,15.98C7.39,17.33,9.53,18.67,12,20c2.47,-1.33,4.61,-2.67,5.66,-4.02c1.05,-1.65,1.05,-6.31,0,-7.96C16.61,6.67,14.47,5.33,12,4Z"
          fill="currentColor"
          fillOpacity="0.4"
        />
        <path
          d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4c2.47,0,4.61,1.33,5.66,3.02C18.71,8.33,18.71,15.67,17.66,16.98C16.61,18.67,14.47,20,12,20s-4.61,-1.33,-5.66,-3.02C5.29,15.67,5.29,8.33,6.34,7.02C7.39,5.33,9.53,4,12,4Z"
          fill="currentColor"
        />
      </svg>
      <span className="font-headline text-xl font-bold md:text-2xl">
        Ayurveda at Tips
      </span>
    </Link>
  );
}
