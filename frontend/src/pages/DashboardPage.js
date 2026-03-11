import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import Overview from '../components/dashboard/modules/Overview';
import AISystemRegistry from '../components/dashboard/modules/AISystemRegistry';
import ImpactMonitoring from '../components/dashboard/modules/ImpactMonitoring';
import ImpactScoreEngine from '../components/dashboard/modules/ImpactScoreEngine';
import ComplianceGenerator from '../components/dashboard/modules/ComplianceGenerator';
import AuditTrail from '../components/dashboard/modules/AuditTrail';
import RegulatoryMonitoring from '../components/dashboard/modules/RegulatoryMonitoring';

const MODULES = {
  '/dashboard': Overview,
  '/dashboard/ai-systems': AISystemRegistry,
  '/dashboard/impact': ImpactMonitoring,
  '/dashboard/score-engine': ImpactScoreEngine,
  '/dashboard/compliance': ComplianceGenerator,
  '/dashboard/audit': AuditTrail,
  '/dashboard/regulatory': RegulatoryMonitoring,
};

export default function DashboardPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState('/dashboard');

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="dash-full-loading">
        <div className="dash-spinner-lg" />
        <p>Loading DHARVA Platform...</p>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  const ActiveModule = MODULES[activeModule] || Overview;

  return (
    <DashboardLayout activeModule={activeModule} setActiveModule={setActiveModule}>
      <ActiveModule />
    </DashboardLayout>
  );
}
