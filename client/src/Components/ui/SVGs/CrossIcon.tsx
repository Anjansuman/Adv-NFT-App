
interface CrossIconProps {
    size: number,
    onClick: () => void
}

export const CrossIcon = ({ size, onClick }: CrossIconProps) => {
    return <div className="hover:bg-[red] rounded-sm transition-colors cursor-pointer"
        onClick={onClick}
    >
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x-icon lucide-x hover:stroke-white transition-colors "><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    </div>
}