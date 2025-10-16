import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCompany } from '../store/slices/companiesSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { selectCurrentCompany, selectLoading } from '../store/selectors/companySelectors';
import LoadingSpinner from './LoadingSpinner';

const CompanyDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const companyDetails = useSelector(selectCurrentCompany);
  const loading = useSelector(selectLoading);
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(getCompany(id));
  }, [dispatch, id]);

  let handleGoBack = () => navigate(-1);
  return (
    <>
        <div>
        {loading && <LoadingSpinner />}
        {companyDetails ? (
            <>
            <h2>{companyDetails.name}</h2>
            <p>Industry: {companyDetails.industry}</p>
            <p>Location: {companyDetails.location}</p>
            </>
        ) : (
            !loading && <p>No details found.</p>
        )}
        </div>

        <span onClick={handleGoBack}>Go Back</span>
    </>
  );
};

export default CompanyDetails;
