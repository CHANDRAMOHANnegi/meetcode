import { PersonalNotes, Subtopic } from "@/types";
import { getPersonalNotes, savePersonalNotes } from "@/utils/notes";
import { Edit3, Save, X } from "lucide-react";
import { useState } from "react";

export const PersonalNotesSection: React.FC<{
  algorithmId: string;
  subtopic: Subtopic;
}> = ({ algorithmId, subtopic }) => {
  const [notes, setNotes] = useState<PersonalNotes>(() => getPersonalNotes(algorithmId));
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'structured' | 'general'>('structured');

  const handleSave = () => {
    savePersonalNotes(algorithmId, { ...notes, lastReviewed: new Date().toISOString().split('T')[0] });
    setIsEditing(false);
  };

  const addToList = (field: keyof Pick<PersonalNotes, 'keyInsights' | 'personalTricks' | 'mistakesMade' | 'interviewTips'>, value: string) => {
    if (value.trim()) {
      setNotes(prev => ({
        ...prev,
        [field]: [...prev[field], value.trim()]
      }));
    }
  };

  const removeFromList = (field: keyof Pick<PersonalNotes, 'keyInsights' | 'personalTricks' | 'mistakesMade' | 'interviewTips'>, index: number) => {
    setNotes(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Edit3 className="w-5 h-5 text-blue-600" />
          My Personal Notes
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Last reviewed: {notes.lastReviewed}</span>
          {isEditing ? (
            <div className="flex gap-2">
              <button onClick={handleSave} className="text-green-600 hover:text-green-700">
                <Save className="w-4 h-4" />
              </button>
              <button onClick={() => setIsEditing(false)} className="text-gray-600 hover:text-gray-700">
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button onClick={() => setIsEditing(true)} className="text-blue-600 hover:text-blue-700">
              <Edit3 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Mastery Level */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Mastery Level:</label>
        <select
          value={notes.masteryLevel}
          onChange={(e) => setNotes(prev => ({ ...prev, masteryLevel: e.target.value as any }))}
          disabled={!isEditing}
          className="border rounded px-3 py-1 text-sm disabled:bg-gray-100"
        >
          <option value="learning">🌱 Learning</option>
          <option value="practicing">🔄 Practicing</option>
          <option value="confident">✅ Confident</option>
          <option value="interview-ready">🎯 Interview Ready</option>
        </select>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-4 border-b">
        <button
          onClick={() => setActiveTab('structured')}
          className={`pb-2 px-1 text-sm font-medium ${activeTab === 'structured' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
        >
          Structured Notes
        </button>
        <button
          onClick={() => setActiveTab('general')}
          className={`pb-2 px-1 text-sm font-medium ${activeTab === 'general' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
        >
          General Notes
        </button>
      </div>

      {activeTab === 'structured' ? (
        <div className="space-y-4">
          {/* Key Insights */}
          <div>
            <h4 className="font-medium text-gray-800 mb-2">💡 Key Insights</h4>
            <div className="space-y-2">
              {notes.keyInsights.map((insight, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-white p-2 rounded border">
                  <span className="flex-1 text-sm">{insight}</span>
                  {isEditing && (
                    <button onClick={() => removeFromList('keyInsights', idx)} className="text-red-500 hover:text-red-700">
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
              {isEditing && (
                <input
                  type="text"
                  placeholder="Add new insight..."
                  className="w-full p-2 border rounded text-sm"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addToList('keyInsights', e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                />
              )}
            </div>
          </div>

          {/* Personal Tricks */}
          <div>
            <h4 className="font-medium text-gray-800 mb-2">🎯 Personal Tricks</h4>
            <div className="space-y-2">
              {notes.personalTricks.map((trick, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-white p-2 rounded border">
                  <span className="flex-1 text-sm">{trick}</span>
                  {isEditing && (
                    <button onClick={() => removeFromList('personalTricks', idx)} className="text-red-500 hover:text-red-700">
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
              {isEditing && (
                <input
                  type="text"
                  placeholder="Add personal trick..."
                  className="w-full p-2 border rounded text-sm"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addToList('personalTricks', e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                />
              )}
            </div>
          </div>

          {/* Mistakes Made */}
          <div>
            <h4 className="font-medium text-gray-800 mb-2">⚠️ Mistakes I Made</h4>
            <div className="space-y-2">
              {notes.mistakesMade.map((mistake, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-white p-2 rounded border">
                  <span className="flex-1 text-sm">{mistake}</span>
                  {isEditing && (
                    <button onClick={() => removeFromList('mistakesMade', idx)} className="text-red-500 hover:text-red-700">
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
              {isEditing && (
                <input
                  type="text"
                  placeholder="Add mistake you made..."
                  className="w-full p-2 border rounded text-sm"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addToList('mistakesMade', e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <textarea
            value={notes.generalNotes}
            onChange={(e) => setNotes(prev => ({ ...prev, generalNotes: e.target.value }))}
            disabled={!isEditing}
            placeholder="Write your general thoughts, observations, and notes here..."
            className="w-full h-32 p-3 border rounded resize-none disabled:bg-gray-100 text-sm"
          />
        </div>
      )}
    </div>
  );
};