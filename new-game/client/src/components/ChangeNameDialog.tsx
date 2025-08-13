import { useState } from 'react';

interface ChangeNameDialogProps {
  open: boolean;
  onClose: () => void;
  currentName: string;
  currentColor: string;
  onChangeName: (name: string, color: string) => void;
}

export default function ChangeNameDialog({
  open,
  onClose,
  currentName,
  currentColor,
  onChangeName,
}: ChangeNameDialogProps) {
  const [name, setName] = useState(currentName);
  const [color, setColor] = useState(currentColor);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onChangeName(name.trim(), color);
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div className="modal-overlay open">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <h3 className="text-xl font-bold text-neon-blue mb-4">تغيير الاسم</h3>
          
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="اكتب اسمك الجديد"
            className="w-full p-3 rounded-lg bg-darker-blue text-light-cyan border-none outline-none mb-4"
            maxLength={20}
            required
          />
          
          <label className="block mt-3 font-bold text-light-cyan mb-2">
            اختر لون الاسم:
          </label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full h-9 rounded-lg border-none cursor-pointer mb-4"
          />
          
          <div className="flex justify-between gap-4">
            <button 
              type="button" 
              className="flex-1 btn-cancel"
              onClick={onClose}
            >
              إلغاء
            </button>
            <button type="submit" className="flex-1 btn-confirm">
              تأكيد
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
