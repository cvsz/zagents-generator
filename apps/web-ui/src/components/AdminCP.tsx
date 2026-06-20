import { useState } from 'react';
import { Settings, Plus, Code, Server, Save } from 'lucide-react';
import { SKILLS } from '../generator/catalog';

export function AdminCP() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSkill, setNewSkill] = useState({ id: '', name: '', description: '', body: '' });

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.id || !newSkill.name) return;
    
    // Mutate the global SKILLS array so ZBuilder can see it
    SKILLS.push({
      id: newSkill.id,
      name: newSkill.name,
      description: newSkill.description || 'Custom added skill',
      body: newSkill.body || 'No implementation provided.',
    });
    
    setNewSkill({ id: '', name: '', description: '', body: '' });
    setShowAddForm(false);
  };

  return (
    <div className="py-8 w-full max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Settings className="text-brand-glow" size={28} />
        <h2 className="text-2xl font-bold text-slate-200">Admin Control Panel</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
        <div className="space-y-2">
          <div className="bg-ink-800/80 p-3 rounded-lg border border-brand/50 cursor-pointer flex items-center gap-3 text-white font-medium">
            <Code size={18} className="text-brand-glow" /> Skill Management
          </div>
          <div className="bg-ink-800/30 hover:bg-ink-800/60 p-3 rounded-lg border border-ink-700 cursor-pointer flex items-center gap-3 text-slate-400 transition">
            <Server size={18} /> Global Configurations
          </div>
        </div>

        <div className="bg-ink-800/30 border border-ink-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-300">Available Skills ({SKILLS.length})</h3>
            <button 
              onClick={() => setShowAddForm(!showAddForm)}
              className="btn btn-primary flex items-center gap-1 text-sm"
            >
              <Plus size={16} /> Add Skill
            </button>
          </div>

          {showAddForm && (
            <div className="bg-ink-900/60 p-4 rounded-lg border border-ink-600 mb-6 animate-in fade-in slide-in-from-top-4">
              <h4 className="text-sm font-semibold text-white mb-3">Add Custom Skill</h4>
              <form onSubmit={handleAddSkill} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Skill ID (kebab-case)</label>
                    <input 
                      type="text" 
                      className="input w-full" 
                      placeholder="e.g. format-code"
                      value={newSkill.id}
                      onChange={e => setNewSkill({...newSkill, id: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Display Name</label>
                    <input 
                      type="text" 
                      className="input w-full" 
                      placeholder="e.g. Code Formatter"
                      value={newSkill.name}
                      onChange={e => setNewSkill({...newSkill, name: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Description</label>
                  <input 
                    type="text" 
                    className="input w-full" 
                    placeholder="Short description of what the skill does"
                    value={newSkill.description}
                    onChange={e => setNewSkill({...newSkill, description: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Skill Body (Markdown)</label>
                  <textarea 
                    className="input w-full min-h-[100px] resize-y" 
                    placeholder="Provide the AI instructions..."
                    value={newSkill.body}
                    onChange={e => setNewSkill({...newSkill, body: e.target.value})}
                  ></textarea>
                </div>
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setShowAddForm(false)} className="px-3 py-1.5 text-sm text-slate-400 hover:text-white transition">Cancel</button>
                  <button type="submit" className="btn btn-primary text-sm flex items-center gap-1"><Save size={14}/> Save Skill</button>
                </div>
              </form>
            </div>
          )}

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2 scroll-thin">
            {SKILLS.map((skill, i) => (
              <div key={`${skill.id}-${i}`} className="bg-ink-900/40 p-3 rounded-md border border-ink-800 flex flex-col gap-1 hover:border-ink-600 transition">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-200 text-sm">{skill.name}</span>
                  <span className="text-xs font-mono text-slate-500 bg-ink-800 px-2 py-0.5 rounded">{skill.id}</span>
                </div>
                <span className="text-xs text-slate-400 truncate">{skill.description}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
