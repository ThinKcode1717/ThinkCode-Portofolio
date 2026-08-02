'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineXMark,
  HiOutlineLockClosed,
  HiOutlineSparkles,
  HiOutlinePlus,
  HiOutlineTrash,
  HiOutlinePencilSquare,
  HiOutlinePhoto,
  HiOutlineCheckCircle,
  HiOutlineExclamationTriangle,
  HiOutlineGlobeAlt,
  HiOutlineArrowPath,
  HiOutlineMagnifyingGlass
} from 'react-icons/hi2';
import { DynamicProjectItem } from '@/lib/projectResolver';
import { THINKCODE_DATA } from '@/lib/data';

interface ProjectCMSModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
  onProjectsUpdated?: () => void;
}

export default function ProjectCMSModal({
  isOpen,
  onClose,
  isDark,
  onProjectsUpdated
}: ProjectCMSModalProps) {
  // Auth state
  const [token, setToken] = useState<string | null>(null);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Projects list state
  const [dynamicProjects, setDynamicProjects] = useState<DynamicProjectItem[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Form Editor state
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeLangTab, setActiveLangTab] = useState<'id' | 'en'>('id');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiMessage, setAiMessage] = useState('');
  const [saveStatus, setSaveStatus] = useState('');

  // Form Fields
  const [formData, setFormData] = useState<{
    id: string;
    category: string;
    year: string;
    metrics: string;
    githubUrl: string;
    liveUrl: string;
    tagsInput: string;
    screenshots: string[];
    idPayload: {
      title: string;
      description: string;
      longDescription: string;
      businessImpact: string;
    };
    enPayload: {
      title: string;
      description: string;
      longDescription: string;
      businessImpact: string;
    };
  }>({
    id: '',
    category: 'Company Profile',
    year: new Date().getFullYear().toString(),
    metrics: 'Production Ready',
    githubUrl: '',
    liveUrl: '',
    tagsInput: 'React, TypeScript, Node.js',
    screenshots: [''],
    idPayload: {
      title: '',
      description: '',
      longDescription: '',
      businessImpact: ''
    },
    enPayload: {
      title: '',
      description: '',
      longDescription: '',
      businessImpact: ''
    }
  });

  // Load token from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('thinkcode_cms_token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  // Fetch dynamic projects when open & authenticated
  useEffect(() => {
    if (isOpen && token) {
      fetchProjects();
    }
  }, [isOpen, token]);

  const fetchProjects = async () => {
    setProjectsLoading(true);
    try {
      const res = await fetch('/api/admin/projects');
      const data = await res.json();
      if (data.success) {
        setDynamicProjects(data.projects || []);
      }
    } catch (err) {
      console.error('Failed to fetch CMS projects:', err);
    } finally {
      setProjectsLoading(false);
    }
  };

  // Handle Login Auth
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode })
      });
      const data = await res.json();

      if (data.success && data.token) {
        setToken(data.token);
        localStorage.setItem('thinkcode_cms_token', data.token);
        setPasscode('');
      } else {
        setAuthError(data.error || 'Passcode salah');
      }
    } catch (err) {
      setAuthError('Gagal menghubungkan ke server login');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('thinkcode_cms_token');
  };

  // Open Form to create new project
  const handleCreateNew = () => {
    const newId = `proj-${Date.now()}`;
    setFormData({
      id: newId,
      category: 'Company Profile',
      year: new Date().getFullYear().toString(),
      metrics: 'Production Ready',
      githubUrl: '',
      liveUrl: '',
      tagsInput: 'React, TypeScript, Node.js',
      screenshots: [''],
      idPayload: {
        title: '',
        description: '',
        longDescription: '',
        businessImpact: ''
      },
      enPayload: {
        title: '',
        description: '',
        longDescription: '',
        businessImpact: ''
      }
    });
    setEditingId(null);
    setIsEditing(true);
    setSaveStatus('');
    setAiMessage('');
  };

  // Open Form to edit dynamic project
  const handleEditProject = (project: DynamicProjectItem) => {
    setFormData({
      id: project.id,
      category: project.category || 'Web Apps',
      year: project.year || '2026',
      metrics: project.metrics || 'Production Ready',
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || '',
      tagsInput: (project.tags || []).join(', '),
      screenshots: project.screenshots && project.screenshots.length > 0 ? project.screenshots : [''],
      idPayload: {
        title: project.idPayload?.title || '',
        description: project.idPayload?.description || '',
        longDescription: project.idPayload?.longDescription || '',
        businessImpact: project.idPayload?.businessImpact || ''
      },
      enPayload: {
        title: project.enPayload?.title || '',
        description: project.enPayload?.description || '',
        longDescription: project.enPayload?.longDescription || '',
        businessImpact: project.enPayload?.businessImpact || ''
      }
    });
    setEditingId(project.id);
    setIsEditing(true);
    setSaveStatus('');
    setAiMessage('');
  };

  // Delete project
  const handleDeleteProject = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus proyek ini dari CMS?')) return;

    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setDynamicProjects(data.projects || []);
        if (onProjectsUpdated) onProjectsUpdated();
        window.dispatchEvent(new CustomEvent('projects-updated'));
      } else {
        alert(data.error || 'Gagal menghapus proyek');
      }
    } catch (err) {
      alert('Error saat menghapus proyek');
    }
  };

  // AI Assistant Drafting & Polishing
  const handleGenerateAi = async (action: 'generate_draft' | 'polish_description') => {
    const currentTitle = activeLangTab === 'id' ? formData.idPayload.title : formData.enPayload.title;
    const currentDesc = activeLangTab === 'id' ? formData.idPayload.description : formData.enPayload.description;

    if (!currentTitle && !currentDesc) {
      alert('Masukkan Judul Proyek terlebih dahulu untuk dibantu oleh AI!');
      return;
    }

    setAiLoading(true);
    setAiMessage('AI sedang memproses draf & menerjemahkan ke 2 bahasa (Groq Llama 3.3)...');

    try {
      const res = await fetch('/api/admin/ai-draft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: currentTitle || formData.idPayload.title || formData.enPayload.title,
          existingDescription: currentDesc,
          action
        })
      });

      const data = await res.json();

      if (data.success && data.draft) {
        const draft = data.draft;
        setFormData((prev) => ({
          ...prev,
          category: draft.category || prev.category,
          year: draft.year || prev.year,
          metrics: draft.metrics || prev.metrics,
          tagsInput: draft.tags ? draft.tags.join(', ') : prev.tagsInput,
          idPayload: {
            title: draft.id?.title || prev.idPayload.title || currentTitle,
            description: draft.id?.description || prev.idPayload.description,
            longDescription: draft.id?.longDescription || prev.idPayload.longDescription,
            businessImpact: draft.id?.businessImpact || prev.idPayload.businessImpact
          },
          enPayload: {
            title: draft.en?.title || prev.enPayload.title || currentTitle,
            description: draft.en?.description || prev.enPayload.description,
            longDescription: draft.en?.longDescription || prev.enPayload.longDescription,
            businessImpact: draft.en?.businessImpact || prev.enPayload.businessImpact
          }
        }));
        setAiMessage(`✨ Draf & Terjemahan 2 Bahasa sukses dibuat oleh AI (${data.model})!`);
      } else {
        setAiMessage(`⚠️ ${data.error || 'Gagal menghasilkan draf AI'}`);
      }
    } catch (err) {
      setAiMessage('⚠️ Gagal terhubung ke service AI API');
    } finally {
      setAiLoading(false);
    }
  };

  // Add & Remove Image URL inputs
  const handleAddImageUrl = () => {
    setFormData((prev) => ({
      ...prev,
      screenshots: [...prev.screenshots, '']
    }));
  };

  const handleUpdateImageUrl = (index: number, val: string) => {
    const updated = [...formData.screenshots];
    updated[index] = val;
    setFormData((prev) => ({
      ...prev,
      screenshots: updated
    }));
  };

  const handleRemoveImageUrl = (index: number) => {
    const updated = formData.screenshots.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      screenshots: updated.length > 0 ? updated : ['']
    }));
  };

  // Save Project Form Submit
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus('Menyimpan data...');

    const parsedTags = formData.tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const validScreenshots = formData.screenshots.filter((s) => s.trim().length > 0);

    const projectPayload: DynamicProjectItem = {
      id: formData.id || `proj-${Date.now()}`,
      category: formData.category,
      year: formData.year,
      metrics: formData.metrics,
      githubUrl: formData.githubUrl,
      liveUrl: formData.liveUrl,
      tags: parsedTags,
      screenshots: validScreenshots,
      idPayload: {
        title: formData.idPayload.title || 'Proyek Tanpa Judul',
        description: formData.idPayload.description || '',
        longDescription: formData.idPayload.longDescription || formData.idPayload.description || '',
        businessImpact: formData.idPayload.businessImpact || ''
      },
      enPayload: {
        title: formData.enPayload.title || formData.idPayload.title || 'Untitled Project',
        description: formData.enPayload.description || formData.idPayload.description || '',
        longDescription: formData.enPayload.longDescription || formData.idPayload.longDescription || '',
        businessImpact: formData.enPayload.businessImpact || formData.idPayload.businessImpact || ''
      }
    };

    try {
      const res = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(projectPayload)
      });

      const data = await res.json();
      if (data.success) {
        setSaveStatus('✅ Proyek berhasil disimpan ke CMS!');
        setDynamicProjects(data.projects || []);
        if (onProjectsUpdated) onProjectsUpdated();
        window.dispatchEvent(new CustomEvent('projects-updated'));
        setTimeout(() => {
          setIsEditing(false);
          setSaveStatus('');
        }, 1000);
      } else {
        setSaveStatus(`❌ ${data.error || 'Gagal menyimpan proyek'}`);
      }
    } catch (err) {
      setSaveStatus('❌ Error koneksi ke server CMS');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className={`relative z-10 w-full max-w-4xl rounded-3xl border p-5 sm:p-8 shadow-2xl overflow-hidden my-auto max-h-[92vh] overflow-y-auto ${
            isDark
              ? 'bg-[#010d1a] border-[#00e5ff]/40 text-white'
              : 'bg-white border-slate-300 text-slate-900'
          }`}
        >
          {/* Close Header Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close CMS"
            className={`absolute top-4 right-4 p-2 rounded-full border transition-colors ${
              isDark
                ? 'bg-[#03192e] border-[#0077b6]/30 text-slate-300 hover:text-white'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-black'
            }`}
          >
            <HiOutlineXMark className="w-5 h-5" />
          </button>

          {/* ── SCREEN 1: PASSCODE AUTHENTICATION ── */}
          {!token ? (
            <div className="max-w-md mx-auto py-8 text-center space-y-6">
              <div className={`w-14 h-14 rounded-2xl border mx-auto flex items-center justify-center ${
                isDark ? 'bg-[#0284c7]/15 border-[#0284c7]/40 text-[#38bdf8]' : 'bg-[#e0f2fe] border-[#0284c7]/30 text-[#0284c7]'
              }`}>
                <HiOutlineLockClosed className="w-7 h-7" />
              </div>

              <div>
                <h3 className="text-xl font-extrabold font-mono">ThinkCode CMS Login</h3>
                <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Masukkan Admin Passcode untuk mengelola data proyek portofolio.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4 text-left">
                <div>
                  <label className="text-xs font-mono font-bold block mb-1.5 text-slate-400 uppercase">
                    Admin Passcode
                  </label>
                  <input
                    type="password"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Masukkan Passcode (default: thinkcode2026)"
                    className={`w-full px-4 py-3 rounded-2xl border text-sm font-mono transition-all outline-none ${
                      isDark
                        ? 'bg-[#000610] border-[#0077b6]/30 text-white focus:border-[#38bdf8]'
                        : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-[#0284c7]'
                    }`}
                  />
                </div>

                {authError && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono flex items-center gap-2">
                    <HiOutlineExclamationTriangle className="w-4 h-4 shrink-0" />
                    <span>{authError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={authLoading}
                  className={`w-full py-3 rounded-2xl font-mono font-bold text-xs uppercase tracking-wider transition-all border ${
                    isDark
                      ? 'bg-[#0284c7] text-white border-[#38bdf8] hover:bg-[#0077b6]'
                      : 'bg-[#0284c7] text-white border-[#0284c7] hover:bg-[#0077b6]'
                  }`}
                >
                  {authLoading ? 'Memverifikasi...' : 'Masuk ke Admin CMS'}
                </button>
              </form>
            </div>
          ) : isEditing ? (
            /* ── SCREEN 3: PROJECT FORM EDITOR (AI & MULTI-IMAGE PREVIEW) ── */
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b pb-4 border-slate-700/30">
                <div>
                  <h3 className="text-lg font-extrabold font-mono">
                    {editingId ? 'Edit Proyek CMS' : 'Tambah Proyek Baru ke CMS'}
                  </h3>
                  <p className="text-xs font-mono text-slate-400">
                    ID: <code className="text-[#38bdf8]">{formData.id}</code>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-mono transition-all ${
                      isDark ? 'border-slate-700 text-slate-400 hover:text-white' : 'border-slate-300 text-slate-700'
                    }`}
                  >
                    Batal
                  </button>
                </div>
              </div>

              {/* AI Copywriting Assistant Toolbar */}
              <div className={`p-4 rounded-2xl border font-mono space-y-2.5 ${
                isDark
                  ? 'bg-gradient-to-r from-[#0284c7]/15 to-[#0077b6]/10 border-[#0284c7]/40 text-slate-200'
                  : 'bg-gradient-to-r from-sky-50 to-blue-50 border-sky-300 text-slate-800'
              }`}>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2 text-xs font-bold">
                    <HiOutlineSparkles className="w-4 h-4 text-[#38bdf8] animate-spin-slow" />
                    <span>Groq AI Copywriter & Auto-Translator (Dual Language ID/EN)</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={aiLoading}
                      onClick={() => handleGenerateAi('generate_draft')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                        isDark
                          ? 'bg-[#0284c7] text-white border-[#38bdf8] hover:bg-[#0077b6]'
                          : 'bg-[#0284c7] text-white border-[#0284c7]'
                      }`}
                    >
                      {aiLoading ? (
                        <HiOutlineArrowPath className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <HiOutlineSparkles className="w-3.5 h-3.5" />
                      )}
                      <span>✨ Generasi Draf & Terjemahkan via AI</span>
                    </button>
                  </div>
                </div>

                {aiMessage && (
                  <p className="text-[11px] leading-relaxed text-[#38bdf8] font-semibold pt-1">
                    {aiMessage}
                  </p>
                )}
              </div>

              <form onSubmit={handleSaveProject} className="space-y-5">
                {/* Basic Meta Fields Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-mono font-bold block mb-1 text-slate-400 uppercase">Kategori</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono outline-none ${
                        isDark ? 'bg-[#000610] border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    >
                      <option value="Company Profile">Company Profile</option>
                      <option value="POS (Point of Sale)">POS (Point of Sale)</option>
                      <option value="E-commerce">E-commerce</option>
                      <option value="Ekspedisi/Logistik">Ekspedisi/Logistik</option>
                      <option value="ERP">ERP</option>
                      <option value="CRM">CRM</option>
                      <option value="HRIS/HRM">HRIS/HRM</option>
                      <option value="LMS (Learning Management System)">LMS (Learning Management System)</option>
                      <option value="Marketplace">Marketplace</option>
                      <option value="Booking/Reservation System">Booking/Reservation System</option>
                      <option value="Chatbot/Customer Service">Chatbot/Customer Service</option>
                      <option value="CMS (Content Management System)">CMS (Content Management System)</option>
                      <option value="Forum/Community Platform">Forum/Community Platform</option>
                      <option value="Social Media Platform">Social Media Platform</option>
                      <option value="Job Portal">Job Portal</option>
                      <option value="Real Estate Platform">Real Estate Platform</option>
                      <option value="Food Delivery">Food Delivery</option>
                      <option value="Ride-hailing">Ride-hailing</option>
                      <option value="Project Management Tool">Project Management Tool</option>
                      <option value="Inventory/Warehouse Management">Inventory/Warehouse Management</option>
                      <option value="Accounting/Finance App">Accounting/Finance App</option>
                      <option value="Healthcare/Telemedicine">Healthcare/Telemedicine</option>
                      <option value="Event Management">Event Management</option>
                      <option value="Survey/Form Builder">Survey/Form Builder</option>
                      <option value="Analytics Dashboard">Analytics Dashboard</option>
                      <option value="Payment Gateway/Wallet">Payment Gateway/Wallet</option>
                      <option value="Rental/Sewa Platform">Rental/Sewa Platform</option>
                      <option value="Auction Platform">Auction Platform</option>
                      <option value="Crowdfunding Platform">Crowdfunding Platform</option>
                      <option value="News/Media Portal">News/Media Portal</option>
                      <option value="Ticketing/Helpdesk System">Ticketing/Helpdesk System</option>
                      <option value="Fleet Management">Fleet Management</option>
                      <option value="School/Campus Management">School/Campus Management</option>
                      <option value="POS + Inventory Hybrid">POS + Inventory Hybrid</option>
                      <option value="Multi-tenant SaaS">Multi-tenant SaaS</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-mono font-bold block mb-1 text-slate-400 uppercase">Tahun</label>
                    <input
                      type="text"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono outline-none ${
                        isDark ? 'bg-[#000610] border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono font-bold block mb-1 text-slate-400 uppercase">Status / Metrics</label>
                    <input
                      type="text"
                      value={formData.metrics}
                      onChange={(e) => setFormData({ ...formData, metrics: e.target.value })}
                      placeholder="e.g. Production Ready / 99.9% Uptime"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono outline-none ${
                        isDark ? 'bg-[#000610] border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>
                </div>

                {/* Tech Stack Tags & External Links */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-mono font-bold block mb-1 text-slate-400 uppercase">
                      Tags Kebahasaan / Tools (Koma)
                    </label>
                    <input
                      type="text"
                      value={formData.tagsInput}
                      onChange={(e) => setFormData({ ...formData, tagsInput: e.target.value })}
                      placeholder="React, TypeScript, Node.js"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono outline-none ${
                        isDark ? 'bg-[#000610] border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono font-bold block mb-1 text-slate-400 uppercase">GitHub Repo URL</label>
                    <input
                      type="text"
                      value={formData.githubUrl}
                      onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                      placeholder="https://github.com/username/repo"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono outline-none ${
                        isDark ? 'bg-[#000610] border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono font-bold block mb-1 text-slate-400 uppercase">Live Web URL</label>
                    <input
                      type="text"
                      value={formData.liveUrl}
                      onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                      placeholder="https://my-app.vercel.app"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono outline-none ${
                        isDark ? 'bg-[#000610] border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>
                </div>

                {/* Dual Language Text Payload Tabs */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b pb-2 border-slate-700/30">
                    <span className="text-xs font-mono font-bold uppercase text-slate-400 flex items-center gap-1.5">
                      <HiOutlineGlobeAlt className="w-4 h-4 text-[#38bdf8]" />
                      <span>Konten Bahasa (Dual Language Payload)</span>
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setActiveLangTab('id')}
                        className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all ${
                          activeLangTab === 'id'
                            ? 'bg-[#0284c7] text-white'
                            : isDark
                              ? 'bg-slate-800 text-slate-400'
                              : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        🇮🇩 Indonesia (ID)
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveLangTab('en')}
                        className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all ${
                          activeLangTab === 'en'
                            ? 'bg-[#0284c7] text-white'
                            : isDark
                              ? 'bg-slate-800 text-slate-400'
                              : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        🇬🇧 English (EN)
                      </button>
                    </div>
                  </div>

                  {activeLangTab === 'id' ? (
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-mono font-bold block mb-1 text-slate-400">Judul Proyek (ID)</label>
                        <input
                          type="text"
                          value={formData.idPayload.title}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              idPayload: { ...formData.idPayload, title: e.target.value }
                            })
                          }
                          placeholder="e.g. Google Maps Scraper Web Platform"
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono outline-none ${
                            isDark ? 'bg-[#000610] border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                          }`}
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono font-bold block mb-1 text-slate-400">Deskripsi Singkat (ID)</label>
                        <textarea
                          rows={2}
                          value={formData.idPayload.description}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              idPayload: { ...formData.idPayload, description: e.target.value }
                            })
                          }
                          placeholder="Penjelasan ringkas proyek..."
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono outline-none ${
                            isDark ? 'bg-[#000610] border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                          }`}
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono font-bold block mb-1 text-slate-400">Deskripsi Lengkap / Arsitektur (ID)</label>
                        <textarea
                          rows={3}
                          value={formData.idPayload.longDescription}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              idPayload: { ...formData.idPayload, longDescription: e.target.value }
                            })
                          }
                          placeholder="Penjelasan arsitektur sistem mendalam..."
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono outline-none ${
                            isDark ? 'bg-[#000610] border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                          }`}
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono font-bold block mb-1 text-slate-400">Dampak Bisnis (ID)</label>
                        <input
                          type="text"
                          value={formData.idPayload.businessImpact}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              idPayload: { ...formData.idPayload, businessImpact: e.target.value }
                            })
                          }
                          placeholder="e.g. Mempercepat riset prospek bisnis lokal 80%"
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono outline-none ${
                            isDark ? 'bg-[#000610] border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                          }`}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-mono font-bold block mb-1 text-slate-400">Project Title (EN)</label>
                        <input
                          type="text"
                          value={formData.enPayload.title}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              enPayload: { ...formData.enPayload, title: e.target.value }
                            })
                          }
                          placeholder="e.g. Google Maps Scraper Web Platform"
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono outline-none ${
                            isDark ? 'bg-[#000610] border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                          }`}
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono font-bold block mb-1 text-slate-400">Short Description (EN)</label>
                        <textarea
                          rows={2}
                          value={formData.enPayload.description}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              enPayload: { ...formData.enPayload, description: e.target.value }
                            })
                          }
                          placeholder="Short project overview in English..."
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono outline-none ${
                            isDark ? 'bg-[#000610] border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                          }`}
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono font-bold block mb-1 text-slate-400">Long Description / Architecture (EN)</label>
                        <textarea
                          rows={3}
                          value={formData.enPayload.longDescription}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              enPayload: { ...formData.enPayload, longDescription: e.target.value }
                            })
                          }
                          placeholder="Detailed architecture description in English..."
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono outline-none ${
                            isDark ? 'bg-[#000610] border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                          }`}
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono font-bold block mb-1 text-slate-400">Business Impact (EN)</label>
                        <input
                          type="text"
                          value={formData.enPayload.businessImpact}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              enPayload: { ...formData.enPayload, businessImpact: e.target.value }
                            })
                          }
                          placeholder="e.g. Accelerates local lead research by 80%"
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono outline-none ${
                            isDark ? 'bg-[#000610] border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                          }`}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Multi-Image URL Input List with Live Picture Preview */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono font-bold uppercase text-slate-400 flex items-center gap-1.5">
                      <HiOutlinePhoto className="w-4 h-4 text-[#38bdf8]" />
                      <span>URL Foto Proyek (Object Storage / External Image)</span>
                    </label>
                    <button
                      type="button"
                      onClick={handleAddImageUrl}
                      className={`px-2.5 py-1 rounded-xl text-xs font-mono font-bold flex items-center gap-1 transition-all border ${
                        isDark
                          ? 'bg-[#0284c7]/20 border-[#0284c7]/40 text-[#38bdf8] hover:bg-[#0284c7]'
                          : 'bg-[#e0f2fe] border-[#0284c7]/30 text-[#0284c7]'
                      }`}
                    >
                      <HiOutlinePlus className="w-3.5 h-3.5" />
                      <span>+ Tambah URL Foto</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {formData.screenshots.map((url, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-2xl border space-y-2 ${
                          isDark ? 'bg-[#000610]/40 border-slate-800' : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={url}
                            onChange={(e) => handleUpdateImageUrl(index, e.target.value)}
                            placeholder={`https://domain.com/storage/photo-${index + 1}.png`}
                            className={`flex-1 px-3.5 py-2.5 rounded-xl border text-xs font-mono outline-none ${
                              isDark ? 'bg-[#010d1a] border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                            }`}
                          />
                          {formData.screenshots.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveImageUrl(index)}
                              className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                            >
                              <HiOutlineTrash className="w-4 h-4" />
                            </button>
                          )}
                        </div>

                        {/* Live Picture Thumbnail Preview */}
                        {url.trim().length > 0 && (
                          <div className="flex items-center gap-3 pt-1">
                            <div className="relative w-28 h-16 rounded-xl overflow-hidden border border-[#0077b6]/30 bg-black/50 shrink-0">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={url}
                                alt={`Live preview ${index + 1}`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  // Fallback indicator if image fails to load
                                  (e.target as HTMLElement).style.display = 'none';
                                }}
                              />
                            </div>
                            <div className="text-[11px] font-mono text-slate-400">
                              <span className="text-emerald-400 font-bold block">Live Thumbnail Preview</span>
                              <span>Foto #{index + 1} terhubung</span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {saveStatus && (
                  <p className="text-xs font-mono font-bold text-[#38bdf8] pt-2">{saveStatus}</p>
                )}

                {/* Form Action Controls */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-700/30">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold border transition-all ${
                      isDark ? 'border-slate-700 text-slate-400 hover:text-white' : 'border-slate-300 text-slate-700'
                    }`}
                  >
                    Batal
                  </button>

                  <button
                    type="submit"
                    className={`px-6 py-2.5 rounded-xl text-xs font-mono font-bold transition-all border flex items-center gap-1.5 ${
                      isDark
                        ? 'bg-[#0284c7] text-white border-[#38bdf8] hover:bg-[#0077b6]'
                        : 'bg-[#0284c7] text-white border-[#0284c7] hover:bg-[#0077b6]'
                    }`}
                  >
                    <HiOutlineCheckCircle className="w-4 h-4" />
                    <span>Simpan Proyek ke CMS</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* ── SCREEN 2: PROJECTS MANAGEMENT DASHBOARD TABLE ── */
            <div className="space-y-6">
              {/* Header Bar */}
              <div className="flex items-center justify-between border-b pb-4 border-slate-700/30 flex-wrap gap-3">
                <div>
                  <h3 className="text-xl font-extrabold font-mono flex items-center gap-2">
                    <span>ThinkCode Project CMS Dashboard</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Authenticated
                    </span>
                  </h3>
                  <p className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Kelola data proyek portofolio tanpa mengubah kode secara manual.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCreateNew}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all border ${
                      isDark
                        ? 'bg-[#0284c7] text-white border-[#38bdf8] hover:bg-[#0077b6]'
                        : 'bg-[#0284c7] text-white border-[#0284c7] hover:bg-[#0077b6]'
                    }`}
                  >
                    <HiOutlinePlus className="w-4 h-4" />
                    <span>+ Tambah Proyek Baru</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className={`px-3 py-2 rounded-xl text-xs font-mono border transition-all ${
                      isDark ? 'border-slate-700 text-slate-400 hover:text-white' : 'border-slate-300 text-slate-700'
                    }`}
                  >
                    Logout
                  </button>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <HiOutlineMagnifyingGlass className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari proyek berdasarkan judul atau kategori..."
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs font-mono outline-none ${
                    isDark ? 'bg-[#000610] border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              {/* Projects List Table */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
                  <span>Proyek Dinamis CMS ({dynamicProjects.length})</span>
                  <span>Menampilkan Proyek Aktif</span>
                </div>

                {projectsLoading ? (
                  <p className="text-xs font-mono text-slate-400 py-6 text-center">Memuat proyek CMS...</p>
                ) : dynamicProjects.length === 0 ? (
                  <div className={`p-8 rounded-2xl border text-center font-mono space-y-2 ${
                    isDark ? 'bg-[#000610]/40 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}>
                    <p className="text-xs">Belum ada proyek dinamis yang ditambahkan di CMS.</p>
                    <p className="text-[11px] text-slate-500">Klik tombol "+ Tambah Proyek Baru" di atas untuk menambahkan.</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {dynamicProjects
                      .filter((p) =>
                        p.idPayload?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        p.category?.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((p) => (
                        <div
                          key={p.id}
                          className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 font-mono transition-all ${
                            isDark
                              ? 'bg-[#000610]/40 border-slate-800 hover:border-[#0284c7]/50'
                              : 'bg-white border-slate-200 hover:border-[#0284c7]/40 shadow-sm'
                          }`}
                        >
                          <div className="min-w-0 flex-1 space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-white truncate">
                                {p.idPayload?.title || p.id}
                              </span>
                              <span className={`text-[10px] px-2 py-0.5 rounded border ${
                                isDark ? 'bg-[#0284c7]/20 text-[#38bdf8] border-[#0284c7]/30' : 'bg-sky-100 text-[#0284c7]'
                              }`}>
                                {p.category}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 truncate">
                              {p.idPayload?.description || 'Tanpa deskripsi'}
                            </p>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={() => handleEditProject(p)}
                              className={`p-2 rounded-xl border text-xs transition-colors ${
                                isDark ? 'bg-[#031729] border-[#0284c7]/40 text-[#38bdf8] hover:bg-[#0284c7] hover:text-white' : 'bg-slate-100 border-slate-300 text-[#0284c7]'
                              }`}
                            >
                              <HiOutlinePencilSquare className="w-4 h-4" />
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDeleteProject(p.id)}
                              className="p-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                            >
                              <HiOutlineTrash className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
