
interface LogoButton {
    name: String,
    onClick: () => void,
}

export const LogoButton = ({ name, onClick }: LogoButton) => {
    return <div className="h-40 w-40 bg-gray-900 rounded-xl flex flex-col justify-center items-center gap-2 cursor-pointer border border-transparent hover:border-white transition-colors "
        onClick={onClick}
    >
        
        <div className="h-16 w-16 bg-gray-800 rounded-full ">

        </div>
        <div className="text-lg font-semibold ">
            {name}
        </div>
    </div>
}