import React, { useEffect, useState } from 'react';
import { X, Table, Download, RefreshCw, CheckCircle } from 'lucide-react';

interface SpreadsheetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SpreadsheetModal: React.FC<SpreadsheetModalProps> = ({ isOpen, onClose }) => {
  const [data, setData] = useState<{ columns: string[]; rows: any[] } | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchSpreadsheetData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/enquiries');
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (e) {
      console.error('Failed to fetch spreadsheet log:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchSpreadsheetData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-5xl rounded-xl border border-[#E5E5E5] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="p-6 bg-[#F4F7F6] border-b border-[#E5E5E5] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#008080] text-white rounded-lg">
              <Table className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold text-[#1A1A1A]">
                Homsi Clinic Enquiry Spreadsheet Log
              </h3>
              <p className="text-xs text-[#666666]">
                Automatic Google Sheets connector payload • Timestamps &amp; Patient details recorded
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#666666] hover:text-[#1A1A1A] rounded-full hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Table */}
        <div className="p-6 overflow-x-auto flex-1">
          {loading ? (
            <div className="py-12 text-center text-[#666666] flex flex-col items-center gap-2">
              <RefreshCw className="w-6 h-6 animate-spin text-[#008080]" />
              <span>Fetching latest spreadsheet entries...</span>
            </div>
          ) : data && data.rows && data.rows.length > 0 ? (
            <div className="border border-[#E5E5E5] rounded-lg overflow-hidden">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#F4F7F6] text-[#1A1A1A] font-bold border-b border-[#E5E5E5]">
                  <tr>
                    <th className="p-3">Timestamp</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Service / Subject</th>
                    <th className="p-3">Pref. Date</th>
                    <th className="p-3">Selection</th>
                    <th className="p-3">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E5E5]">
                  {data.rows.map((row) => (
                    <tr key={row.id} className="hover:bg-[#F4F7F6]/50 transition-colors">
                      <td className="p-3 text-[#666666] font-mono text-[11px] whitespace-nowrap">
                        {new Date(row.timestamp).toLocaleString('en-GB')}
                      </td>
                      <td className="p-3 font-semibold text-[#1A1A1A]">{row.name}</td>
                      <td className="p-3 text-[#008080] font-mono">{row.phone}</td>
                      <td className="p-3 text-[#666666]">{row.email || '—'}</td>
                      <td className="p-3 font-medium text-[#1A1A1A]">{row.service}</td>
                      <td className="p-3 text-[#666666]">{row.preferredDate || '—'}</td>
                      <td className="p-3 text-xs text-[#666666]">
                        {row.concern ? `${row.concern} / ${row.goal}` : '—'}
                      </td>
                      <td className="p-3 text-[#666666] max-w-[200px] truncate">
                        {row.message || '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-12 text-center text-[#666666]">
              No enquiries logged yet.
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#F4F7F6] border-t border-[#E5E5E5] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-[#008080] font-semibold">
            <CheckCircle className="w-4 h-4" />
            <span>Connected to Google Sheets Log • Realtime Auto-Append</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchSpreadsheetData}
              className="px-4 py-2 text-xs font-semibold text-[#1A1A1A] bg-white border border-[#E5E5E5] rounded-lg hover:bg-[#E5E5E5]/50 transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh Log</span>
            </button>

            <a
              href="/api/enquiries/csv"
              download="homsi_clinic_enquiries.csv"
              className="px-4 py-2 text-xs font-semibold text-white bg-[#008080] rounded-lg hover:bg-[#006666] transition-colors flex items-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Google Sheets CSV</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
