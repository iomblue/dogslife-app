import React, { useState, useEffect, useMemo } from 'react';
import { analyzeSymptoms } from '../../services/geminiService';
import type { SymptomAnalysis, SymptomAnalysisHistoryItem, MedicalRecord } from '../../types';
import Hero from '../Hero';
import SymptomInput from '../SymptomInput';
import LoadingSpinner from '../LoadingSpinner';
import ErrorDisplay from '../ErrorDisplay';
import ResultDisplay from '../ResultDisplay';
import AnalysisHistoryList from '../medical/AnalysisHistoryList';
import AnalysisDetailModal from '../medical/AnalysisDetailModal';
import DisclaimerModal from '../medical/DisclaimerModal';
import UpcomingReminders from '../medical/UpcomingReminders';
import AddMedicalRecordForm from '../medical/AddMedicalRecordForm';
import MedicalHistoryScreen from './MedicalHistoryScreen';

const SymptomCheckerScreen: React.FC = () => {
  const [view, setView] = useState<'main' | 'history'>('main');

  // Symptom Checker State
  const [symptoms, setSymptoms] = useState<string>('');
  const [analysis, setAnalysis] = useState<SymptomAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<SymptomAnalysisHistoryItem[]>(() => {
    try {
      const savedHistory = localStorage.getItem('paws-symptom-history');
      return savedHistory ? JSON.parse(savedHistory) : [];
    } catch (e) {
      return [];
    }
  });
  const [selectedAnalysis, setSelectedAnalysis] = useState<SymptomAnalysis | null>(null);
  const [isDisclaimerModalOpen, setIsDisclaimerModalOpen] = useState<boolean>(false);

  // Medical Records State
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>(() => {
    try {
      const savedRecords = localStorage.getItem('paws-medical-records');
      return savedRecords ? JSON.parse(savedRecords) : [];
    } catch (e) {
      return [];
    }
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<MedicalRecord | null>(null);

  useEffect(() => {
    localStorage.setItem('paws-symptom-history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('paws-medical-records', JSON.stringify(medicalRecords));
  }, [medicalRecords]);

  const handleSubmit = () => {
    if (!symptoms.trim()) {
      setError('Please describe your pet\'s symptoms.');
      return;
    }
    setError(null);
    setAnalysis(null);
    setIsDisclaimerModalOpen(true);
  };

  const handleAnalysisConfirm = async () => {
    setIsDisclaimerModalOpen(false);
    setIsLoading(true);

    try {
      const result = await analyzeSymptoms(symptoms);
      setAnalysis(result);
      const historyItem: SymptomAnalysisHistoryItem = {
        ...result,
        id: new Date().toISOString(),
        date: new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }),
        symptoms: symptoms,
      };
      setHistory(prev => [historyItem, ...prev]);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSaveRecord = (record: Omit<MedicalRecord, 'id'>) => {
    if (editingRecord) {
        const newRecords = medicalRecords.map(r => r.id === editingRecord.id ? { ...r, ...record } : r);
        setMedicalRecords(newRecords);
    } else {
        const newRecord: MedicalRecord = {
            ...record,
            id: new Date().toISOString() + Math.random(),
        };
        setMedicalRecords(prev => [newRecord, ...prev]);
    }
    setIsAddModalOpen(false);
    setIsReminderModalOpen(false);
    setEditingRecord(null);
  };

  const handleEditReminder = (reminder: MedicalRecord) => {
    setEditingRecord(reminder);
    setIsAddModalOpen(true);
  }

  const upcomingReminders = useMemo(() => {
    return medicalRecords
        .filter(r => r.dueDate && new Date(r.dueDate) >= new Date())
        .sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime());
  }, [medicalRecords]);


  if (view === 'history') {
    return <MedicalHistoryScreen records={medicalRecords} onBack={() => setView('main')} />;
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Reminders and History Section */}
        <div className="space-y-6">
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold text-slate-800">Upcoming Reminders</h3>
                </div>
                <UpcomingReminders reminders={upcomingReminders.slice(0, 3)} onEdit={handleEditReminder} />
                 <div className="flex justify-between items-center mt-4">
                    <button 
                        onClick={() => { setEditingRecord(null); setIsAddModalOpen(true); }} 
                        className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        Medical Record
                    </button>
                    <button 
                        onClick={() => { setEditingRecord(null); setIsReminderModalOpen(true); }} 
                        className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        Set Reminder
                    </button>
                </div>
            </div>
             <div className="bg-white p-4 rounded-lg shadow border">
                <div className="flex justify-between items-center">
                    <div>
                        <h4 className="font-bold text-slate-800">Medical History</h4>
                        <p className="text-sm text-slate-500">View all past vet visits, vaccinations, and more.</p>
                    </div>
                    <button 
                        onClick={() => setView('history')}
                        className="bg-slate-200 text-slate-700 font-bold py-2 px-4 rounded-lg hover:bg-slate-300 text-sm"
                    >
                        View Full History
                    </button>
                </div>
            </div>
        </div>

        {/* Symptom Checker Section */}
        <div className="space-y-8 pt-8 border-t">
          <Hero />
          <SymptomInput
            symptoms={symptoms}
            setSymptoms={setSymptoms}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />

          {isLoading && <LoadingSpinner />}
          {error && <ErrorDisplay message={error} />}
          {analysis && <ResultDisplay analysis={analysis} />}
          
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Analysis History</h3>
            <AnalysisHistoryList history={history} onSelect={setSelectedAnalysis} />
          </div>
        </div>
      </div>
      
      {isDisclaimerModalOpen && (
        <DisclaimerModal 
            onConfirm={handleAnalysisConfirm}
            onCancel={() => setIsDisclaimerModalOpen(false)}
        />
      )}

      {selectedAnalysis && (
        <AnalysisDetailModal 
          analysis={selectedAnalysis} 
          onClose={() => setSelectedAnalysis(null)} 
        />
      )}

      {(isAddModalOpen || isReminderModalOpen) && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in" onClick={() => { setIsAddModalOpen(false); setIsReminderModalOpen(false); setEditingRecord(null); }}>
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
                <AddMedicalRecordForm 
                    onSave={handleSaveRecord}
                    onCancel={() => { setIsAddModalOpen(false); setIsReminderModalOpen(false); setEditingRecord(null); }}
                    record={editingRecord}
                />
            </div>
        </div>
      )}
    </div>
  );
};

export default SymptomCheckerScreen;
