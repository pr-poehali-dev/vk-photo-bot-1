import { useState } from "react";
import Icon from "@/components/ui/icon";

const SPECS = [
  { label: "Материал", value: "Сталь 3мм" },
  { label: "Размер пресс-формы", value: "120 × 80 мм" },
  { label: "Пружины", value: "4 шт. в комплекте" },
  { label: "Высота стойки", value: "~400 мм" },
  { label: "Вес", value: "~2.5 кг" },
  { label: "Исполнение", value: "Ручная сварка" },
];

export default function ProductCard() {
  const [qty, setQty] = useState(1);
  const [ordered, setOrdered] = useState(false);

  const price = 3500;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="glass rounded-3xl overflow-hidden neon-border-purple">
        {/* Фото товара */}
        <div className="relative bg-[hsla(240,12%,8%,1)]">
          <img
            src="https://cdn.poehali.dev/projects/e13830ba-04d5-468f-9580-ab24e3b97647/bucket/2401fda2-1217-4932-8fac-a6cec09d6c62.jpg"
            alt="Пресс для технопланктона"
            className="w-full object-cover max-h-[380px]"
          />
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[hsl(25,90%,60%)] text-white">
              Ручная работа
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[hsla(270,80%,65%,0.9)] text-white">
              В наличии
            </span>
          </div>
        </div>

        {/* Контент */}
        <div className="p-5">
          <h2 className="font-oswald text-2xl font-bold text-white mb-1">
            Пресс для технопланктона
          </h2>
          <p className="text-[hsl(215,20%,55%)] text-sm mb-4">
            Профессиональный пресс ручной сварки для изготовления технопланктона. Надёжная конструкция из стали с комплектом сменных пружин.
          </p>

          {/* Характеристики */}
          <div className="grid grid-cols-2 gap-2 mb-5">
            {SPECS.map((s) => (
              <div key={s.label} className="bg-[hsla(240,15%,12%,1)] rounded-xl px-3 py-2">
                <div className="text-[hsl(215,20%,45%)] text-xs mb-0.5">{s.label}</div>
                <div className="text-white text-sm font-medium">{s.value}</div>
              </div>
            ))}
          </div>

          {/* Цена и кол-во */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[hsl(215,20%,45%)] text-xs mb-0.5">Цена за штуку</div>
              <div className="font-oswald text-3xl font-bold text-gradient-purple">
                {(price * qty).toLocaleString("ru-RU")} ₽
              </div>
            </div>
            <div className="flex items-center gap-3 glass rounded-xl px-2 py-1.5">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[hsl(270,80%,75%)] hover:bg-white/10 transition-colors"
              >
                <Icon name="Minus" size={16} />
              </button>
              <span className="font-oswald text-xl font-bold text-white w-6 text-center">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[hsl(270,80%,75%)] hover:bg-white/10 transition-colors"
              >
                <Icon name="Plus" size={16} />
              </button>
            </div>
          </div>

          {/* Кнопка заказа */}
          <button
            onClick={() => setOrdered(true)}
            disabled={ordered}
            className={`w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all duration-300 ${
              ordered
                ? "bg-[hsla(180,80%,55%,0.2)] text-[hsl(180,80%,65%)] cursor-default"
                : "bg-gradient-to-r from-[hsl(270,80%,65%)] to-[hsl(320,80%,65%)] text-white glow-purple hover:opacity-90"
            }`}
          >
            <Icon name={ordered ? "CheckCircle" : "ShoppingCart"} size={20} />
            {ordered ? "Заявка отправлена!" : "Заказать"}
          </button>

          {ordered && (
            <p className="text-center text-[hsl(215,20%,45%)] text-xs mt-2">
              Свяжемся с вами в ближайшее время
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
