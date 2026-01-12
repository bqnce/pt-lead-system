import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";

interface CustomSelectProps {
  name: string;
  label: string;
  options: { value: string }[];
  placeholder: string;
}

export function CustomSelect({
  name,
  label,
  options,
  placeholder,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const handleSelect = (value: string) => {
    setSelected(value);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <input type="hidden" name={name} value={selected} />
      <label className="mb-2.5 block text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">
        {label}
      </label>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative w-full text-left rounded-2xl border px-5 py-4 outline-none transition-all duration-300 flex items-center justify-between cursor-pointer
            ${
              isOpen
                ? "border-blue-400 bg-white shadow-xl shadow-blue-900/5 ring-4 ring-blue-50"
                : "border-slate-200 bg-slate-50/50 hover:bg-white hover:border-blue-300 hover:shadow-md"
            }
          `}
      >
        <span
          className={
            selected ? "text-slate-900 font-bold" : "text-slate-400 font-medium"
          }
        >
          {selected || placeholder}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-slate-400 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-blue-500" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-30"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-0 right-0 top-full mt-3 z-40 overflow-hidden rounded-3xl border border-slate-100 bg-white/95 backdrop-blur-xl shadow-2xl shadow-blue-900/10 py-2"
            >
              <div className="max-h-60 overflow-y-auto">
                {options.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleSelect(opt.value)}
                    className="flex w-full items-center justify-between px-5 py-3.5 text-left transition-colors hover:bg-blue-50/50"
                  >
                    <span
                      className={`text-sm ${
                        selected === opt.value
                          ? "font-black text-blue-600"
                          : "text-slate-600 font-semibold"
                      }`}
                    >
                      {opt.value}
                    </span>
                    {selected === opt.value && (
                      <Check className="h-4 w-4 text-blue-600" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
