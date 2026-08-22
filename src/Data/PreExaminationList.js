import React, { useState, useEffect } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import apiClient from "../API/apiClient";
import LoadingComponent from '../Components/LoadingComponent';
import AutoTranslate from '../i18n/AutoTranslate';
import { API_HOST } from "../API/apiConfig";
import { Link } from "react-router-dom";

const PreExaminationList = ({ onOpenCase }) => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(`${API_HOST}/api/pre-examination/pending`);
      setCases(response.data || []);
    } catch (error) {
      console.error("Error fetching pre-examination cases:", error);
      setCases([]);
    } finally {
      setLoading(false);
    }
  };

  const filtered = cases.filter((c) => {
    const term = searchTerm.toLowerCase();
    return (
      c.fileNo?.toLowerCase().includes(term) ||
      c.title?.toLowerCase().includes(term) ||
      c.firNumber?.toLowerCase().includes(term) ||
      c.policeStation?.toLowerCase().includes(term)
    );
  });

  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getPageNumbers = () => {
    const maxPageNumbers = 5;
    const startPage = Math.floor((currentPage - 1) / maxPageNumbers) * maxPageNumbers + 1;
    const endPage = Math.min(startPage + maxPageNumbers - 1, totalPages);
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  const statusLabel = (status) => {
    if (status === "COMPLETED") return { text: "Pre-Examination Completed", cls: "completed" };
    if (status === "IN_PROGRESS") return { text: "Pre-Examination In Progress", cls: "in-progress" };
    return { text: "Pre-Examination Pending", cls: "pending" };
  };

  if (loading) return <LoadingComponent />;

  return (
    <div className="card">
      <div className="grid grid-col-4 mb-4">
        <div className="form-group">
          <label htmlFor="itemsPerPage"><AutoTranslate>Show:</AutoTranslate></label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
          >
            {[5, 10, 15, 20].map((num) => <option key={num} value={num}>{num}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label><AutoTranslate>Search</AutoTranslate></label>
          <input
            type="text"
            className="searchIcon"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          />
        </div>
      </div>

      <div className="table-wrapper mb-8">
        <table>
          <thead>
            <tr>
              <th><AutoTranslate>Case No</AutoTranslate></th>
              <th><AutoTranslate>Case Title</AutoTranslate></th>
              <th><AutoTranslate>FIR</AutoTranslate></th>
              <th><AutoTranslate>Police Station</AutoTranslate></th>
              <th><AutoTranslate>Evidence Count</AutoTranslate></th>
              <th><AutoTranslate>Priority</AutoTranslate></th>
              <th className="text-center"><AutoTranslate>Status</AutoTranslate></th>
              <th className="text-center"><AutoTranslate>Action</AutoTranslate></th>
            </tr>
          </thead>
          <tbody>
            {paginated.length > 0 ? paginated.map((c) => {
              const status = statusLabel(c.preExamStatus);
              return (
                <tr key={c.documentHeaderId}>
                  <td>{c.fileNo || '--'}</td>
                  <td>{c.title || '--'}</td>
                  <td>{c.firNumber || '--'}</td>
                  <td>{c.policeStation || '--'}</td>
                  <td className="text-center">{c.evidenceList?.length || 0}</td>
                  <td>{c.priorityName || '--'}</td>
                  <td className="text-center">
                    <span className={`status-badge ${status.cls}`}>{status.text}</span>
                  </td>
                  <td className="text-center">
                    <button className="btnTable" onClick={() => onOpenCase(c.documentHeaderId)}>
                      <AutoTranslate>View & Pre-Examine</AutoTranslate>
                    </button>
                  </td>
                </tr>
              );
            }) : (
              <tr>
                <td colSpan={8} className="text-center">
                  <AutoTranslate>No cases pending pre-examination.</AutoTranslate>
                </td>
              </tr>
            )}
            <tr>
              <td>case4</td>
              <td>Attempt to Murder</td>
              <td>51245</td>
              <td>kendrapada police station </td>
              <td class="text-center">3</td>
              <td>High</td>
              <td class="text-center"><span class="status-badge pending">Referral Pre-Examination Pending</span></td>
              <td className="text-center">
                <Link to="/referral-pre-examination">
                  <button className="btnTable">
                    <AutoTranslate>View & Pre-Examine</AutoTranslate>
                  </button>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="paginationWp mb-20">
        <div className="items">
          <div className="paginationText">
            <span className="text-sm text-gray-700">
              <AutoTranslate>
                {`Showing ${totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to ${Math.min(currentPage * itemsPerPage, totalItems)} of ${totalItems} entries.`}
              </AutoTranslate>
            </span>
            <span className="text-sm text-gray-700 mx-2">(<AutoTranslate>Pages</AutoTranslate> {totalPages})</span>
          </div>
        </div>
        <div className="items">
          <div className="paginationBtn">
            <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1 || totalPages === 0}>
              <IoIosArrowBack />
            </button>
            {totalPages > 0 && getPageNumbers().map((page) => (
              <button key={page} onClick={() => setCurrentPage(page)} className={currentPage === page ? "active" : ""}>
                {page}
              </button>
            ))}
            <button onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages || totalPages === 0}>
              <IoIosArrowForward />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreExaminationList;