import { Link } from 'react-router-dom';
export default function ErrorPage() {

  return (
    <div className="flex items-center h-screen">
      <div className="w-full text-center">
        <h1 className="text-6xl font-bold mb-10">404</h1>
        <p className="text-3xl  mb-10">Oops, the page you're looking for can't be found.</p>
        
        <p className="text-2xl mt-10">Go back to the <Link to="/" className="text-red-500 underline">Homepage</Link></p>
      </div>
    </div>
  );
}
