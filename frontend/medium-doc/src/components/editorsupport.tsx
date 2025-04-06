import { useState } from "react";
import { X, ArrowLeft, ArrowRight } from "lucide-react";

type Slide = {
  title: string;
  subtitle: string;
  content: string;
};

const FloatingOverlay = ({ slides }: { slides: Slide[] }) => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const next = () => setIndex((i) => (i + 1) % slides.length);
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);

  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center">
      <div className="relative w-[90%] max-w-xl bg-white p-6 rounded-2xl shadow-2xl text-center space-y-4">
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
          onClick={() => setVisible(false)}
        >
          <X />
        </button>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold">{slides[index].title}</h2>
          <h3 className="text-md text-gray-600">{slides[index].subtitle}</h3>
          <p className="text-base text-gray-700">{slides[index].content}</p>
        </div>

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={prev}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <ArrowLeft />
          </button>
          <span className="text-sm text-gray-500">
            {index + 1} / {slides.length}
          </span>
          <button
            onClick={next}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatingOverlay;
