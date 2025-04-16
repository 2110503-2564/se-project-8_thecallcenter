import Link from "next/link";

interface ButtonProps {
  variant?: "primary" | "white-outline" | "black-outline" | "black-outline-light";
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}

export default function Button({
  variant = "primary",
  children,
  onClick,
  href,
  className = "",
}: ButtonProps) {
  const baseStyles =
    "rounded-md py-2 px-6 font-semibold text-lg transition-all duration-200 h-[50px] w-[200px] text-center flex items-center justify-center";

  const variants = {
    primary: "bg-[#F2814D] text-white shadow-md hover:opacity-90",
    "white-outline": 
      "bg-white text-black shadow-md hover:bg-gray-100",
    "black-outline":
      "bg-transitive text-white shadow-md border border-white hover:bg-white hover:text-black",
    "black-outline-light":
      "bg-white text-black shadow-md hover:bg-black hover:text-white",

  };

  const combinedClass = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href}>
        <div className={combinedClass}>{children}</div>
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={combinedClass}>
      {children}
    </button>
  );
}
