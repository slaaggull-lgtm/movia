import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="text-center py-24">
    <h1 className="text-5xl font-extrabold mb-4">404</h1>
    <p className="text-gray-500 mb-6">Bu sayfa bulunamadı 🎬</p>
    <Link to="/" className="btn-primary">Ana sayfaya dön</Link>
  </div>
);

export default NotFound;
