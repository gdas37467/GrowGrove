import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row">
            <a
              href="/"
              className="text-sm mx-0 my-2 md:my-0 hover:text-gray-500"
            >
              Terms of Service
            </a>
            <a
              href="/"
              className="text-sm mx-2 my-2 md:ml-96 md:my-0 hover:text-gray-500"
            >
              Privacy Policy
            </a>
          </div>
          <p className="text-center text-sm md:text-left">
            &copy; 2023 Cryptoption. All rights reserved.
          </p>
        </div>
      </footer>
  )
}

export default Footer
