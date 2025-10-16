import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCurrentCompany, getCompany } from '../store/slices/companiesSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { selectCurrentCompany, selectLoading } from '../store/selectors/companySelectors';
import LoadingSpinner from './LoadingSpinner';

const CompanyDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const companyDetails = useSelector(selectCurrentCompany);
  const loading = useSelector(selectLoading);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCompany(id));

    // Cleanup on unmount → clear selected company
    return () => {
      dispatch(clearCurrentCompany());
    };
  }, [dispatch, id]);


  const handleGoBack = () => {
    dispatch(clearCurrentCompany());
    navigate(-1);
  };

  const getCompanyImage = (industry) => {
  const industryImages = {
    Technology: 'https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg',
    Finance: 'https://images.pexels.com/photos/210990/pexels-photo-210990.jpeg',
    Healthcare: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg',
    Education: 'https://images.pexels.com/photos/5212325/pexels-photo-5212325.jpeg',
    'Renewable Energy': 'https://images.pexels.com/photos/987544/pexels-photo-987544.jpeg',
    Design: 'https://images.pexels.com/photos/3184658/pexels-photo-3184658.jpeg',
    Automotive: 'https://images.pexels.com/photos/4489721/pexels-photo-4489721.jpeg',
  };

  return industryImages[industry] || 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg';
};


  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-gray-100 flex items-center justify-center py-16 px-6">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="max-w-3xl w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-gray-900/60 backdrop-blur-xl transition-all duration-500 hover:shadow-indigo-500/20">
          {companyDetails ? (
            <>
              {/* Banner Image */}
              <div className="relative">
                <img
                  src={companyDetails ? getCompanyImage(companyDetails.industry) : ''}
                  alt="Company Banner"
                  className="w-full h-56 object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 to-transparent"></div>
                <h2 className="absolute bottom-4 left-6 text-3xl font-semibold text-white drop-shadow-lg">
                  {companyDetails.name}
                </h2>
              </div>

              {/* Content */}
              <div className="p-8 space-y-6">
                {/* Company Info */}
                <div className="grid sm:grid-cols-2 gap-4 text-gray-300">
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-6 h-6 text-indigo-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m2 8H7a2 2 0 01-2-2V7a2 2 0 012-2h5l2 2h5a2 2 0 012 2v9a2 2 0 01-2 2z"
                      />
                    </svg>
                    <p>
                      <span className="font-semibold text-indigo-300">Industry:</span>{' '}
                      {companyDetails.industry}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <svg
                      className="w-6 h-6 text-indigo-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0z"
                      />
                    </svg>
                    <p>
                      <span className="font-semibold text-indigo-300">Location:</span>{' '}
                      {companyDetails.location}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <svg
                      className="w-6 h-6 text-indigo-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p>
                      <span className="font-semibold text-indigo-300">Founded:</span>{' '}
                      {companyDetails.founded || '—'}
                    </p>
                  </div>

                  {companyDetails.website && (
                    <div className="flex items-center gap-3">
                      <svg
                        className="w-6 h-6 text-indigo-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                        />
                      </svg>
                      <a
                        href={companyDetails.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-400 hover:text-indigo-300 underline"
                      >
                        Visit Website
                      </a>
                    </div>
                  )}
                </div>

                {/* Description */}
                {companyDetails.description && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-indigo-400 mb-2">
                      About Company
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {companyDetails.description}
                    </p>
                  </div>
                )}

                {/* Back Button */}
                <div className="flex justify-center">
                  <button
                    onClick={handleGoBack}
                    className="mt-6 rounded-full bg-indigo-500 px-6 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-400 transition-all duration-300 active:scale-95"
                  >
                    ← Go Back
                  </button>
                </div>
              </div>
            </>
          ) : (
            <p className="text-gray-400 text-lg p-8 text-center">
              No details found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default CompanyDetails;
