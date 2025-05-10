

export const DisconnectPanel = ({ onClick }: { onClick: () => void }) => {
    return <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
        <div className="bg-gray-900 text-white rounded-2xl shadow-xl p-8 w-full max-w-md flex flex-col items-center gap-6 border border-gray-700">
          {/* Wallet SVG */}
          <div className="w-20 h-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-full h-full text-blue-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75V17.25C3.75 18.4926 4.75736 19.5 6 19.5H18C19.2426 19.5 20.25 18.4926 20.25 17.25V6.75C20.25 5.50736 19.2426 4.5 18 4.5H6C4.75736 4.5 3.75 5.50736 3.75 6.75Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 12H17.25C17.6642 12 18 12.3358 18 12.75C18 13.1642 17.6642 13.5 17.25 13.5H16.5C16.0858 13.5 15.75 13.1642 15.75 12.75C15.75 12.3358 16.0858 12 16.5 12Z"
              />
            </svg>
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-bold text-center">
            Connect Your Wallet
          </h2>

          {/* Message */}
          <p className="text-sm text-center text-gray-300">
            To explore and purchase tickets, please connect your MetaMask wallet. This ensures a secure and personalized experience.
          </p>

          {/* Button */}
          <button
            onClick={onClick}
            className="bg-blue-600 hover:bg-blue-700 transition-colors px-5 py-3 rounded-lg text-white font-semibold"
          >
            Connect MetaMask
          </button>
        </div>
      </div>
}