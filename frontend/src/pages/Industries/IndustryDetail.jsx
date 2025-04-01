import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { ArrowLeft } from "lucide-react";

const IndustryDetail = () => {
  const { id } = useParams();
  const [industry, setIndustry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIndustry = async () => {
      try {
        const docRef = doc(db, "projects", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setIndustry({ id: docSnap.id, ...docSnap.data() });
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching industry:", error);
        setLoading(false);
      }
    };

    fetchIndustry();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!industry) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Industry not found</h2>
          <Link to="/industries" className="btn btn-primary">
            Back to Industries
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/industries" className="btn btn-ghost mb-6">
        <ArrowLeft size={20} />
        Back to Industries
      </Link>

      <div className="card bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <img
            src={industry.imageUrl}
            alt={industry.name}
            className="rounded-xl max-h-[400px] object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-3xl">{industry.name}</h2>
          <div className="divider"></div>
          <div className="prose max-w-none">
            <p>{industry.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustryDetail;
