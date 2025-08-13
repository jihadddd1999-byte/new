interface InstructionsDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function InstructionsDialog({
  open,
  onClose,
}: InstructionsDialogProps) {
  if (!open) return null;

  return (
    <div className="modal-overlay open">
      <div className="modal-content">
        <h3 className="instructions-title">
          📖 تعليمات اللعبة
        </h3>
        
        <div className="instructions-content">
          <ol>
            <li>تظهر كلمة على الشاشة، اكتبها بأسرع وقت ممكن واضغط Enter.</li>
            <li>لاعب واحد فقط يستطيع الإجابة على كل كلمة.</li>
            <li>كل إجابة صحيحة تمنحك 10 نقاط.</li>
            <li>اللاعب الذي يصل إلى 200 نقطة يفوز باللعبة.</li>
            <li>يمكنك تكوين فرق والمنافسة جماعياً.</li>
            <li>استخدم نظام التصويت لتغيير نمط اللعب.</li>
            <li>تابع إحصائياتك الشخصية من زر الإحصائيات.</li>
            <li>يمكنك التواصل مع اللاعبين الآخرين عبر الشات.</li>
            <li>استخدم زر "تغيير الاسم" لتعديل اسمك ولونك في اللعبة.</li>
            <li>هناك كلمات خاصة تظهر بألوان وتأثير اهتزاز في الشات.</li>
            <li>احترم اللاعبين الآخرين والتزم باللعب النظيف.</li>
            <li>استمتع باللعب وحاول الوصول إلى القمة!</li>
          </ol>
        </div>
        
        <button 
          className="close-instructions-btn"
          onClick={onClose}
        >
          إغلاق
        </button>
      </div>
    </div>
  );
}
