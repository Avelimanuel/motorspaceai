export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-6 py-12">
      <div className="max-w-md">
        <h1 className="text-6xl font-extrabold text-gray-900">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mt-4">
          Page Not Found
        </h2>
        <p className="text-gray-500 mt-2">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="mt-6">
          <a
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-xl transition duration-200"
          >
            ⬅ Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
