import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const GALLERY_IMAGES = [
  {
    url: "https://cdn.poehali.dev/projects/e13830ba-04d5-468f-9580-ab24e3b97647/files/038a6874-1a85-4324-a111-46f0328553d2.jpg",
    label: "Неоновый стиль",
    tag: "Популярный",
  },
  {
    url: "https://cdn.poehali.dev/projects/e13830ba-04d5-468f-9580-ab24e3b97647/files/9d32bfab-f253-4f2b-91dc-63f941e48145.jpg",
    label: "Голограмма",
    tag: "Новинка",
  },
  {
    url: "https://cdn.poehali.dev/projects/e13830ba-04d5-468f-9580-ab24e3b97647/files/8c86917d-aea2-4873-a4e2-85a8cc009338.jpg",
    label: "Синтвейв",
    tag: "Хит",
  },
];

const COMMANDS = [
  { icon: "Zap", label: "/start", desc: "Запустить бота", color: "neon-purple" },
  { icon: "Image", label: "/generate", desc: "Создать изображение", color: "neon-cyan" },
  { icon: "Palette", label: "/style", desc: "Выбрать стиль", color: "neon-pink" },
  { icon: "Settings2", label: "/params", desc: "Настроить параметры", color: "neon-orange" },
  { icon: "History", label: "/history", desc: "История запросов", color: "neon-purple" },
  { icon: "HelpCircle", label: "/help", desc: "Справка и поддержка", color: "neon-cyan" },
];

const STYLES = [
  { name: "Аниме", emoji: "🌸" },
  { name: "Реализм", emoji: "📸" },
  { name: "Киберпанк", emoji: "🤖" },
  { name: "Акварель", emoji: "🎨" },
  { name: "Пиксель-арт", emoji: "👾" },
  { name: "3D рендер", emoji: "✨" },
];

const PARAMS = [
  { label: "Разрешение", key: "resolution", options: ["512×512", "1024×1024", "2048×2048"], default: "1024×1024" },
  { label: "Качество", key: "quality", options: ["SD", "HD", "Ultra HD"], default: "HD" },
  { label: "Количество", key: "count", options: ["1", "2", "4", "8"], default: "4" },
];

const PLANS = [
  {
    name: "Старт",
    price: "299",
    features: ["50 генераций", "SD качество", "3 стиля"],
    color: "cyan",
    popular: false,
  },
  {
    name: "Про",
    price: "799",
    features: ["Безлимит", "HD качество", "Все стили", "Приоритет"],
    color: "purple",
    popular: true,
  },
  {
    name: "Бизнес",
    price: "2490",
    features: ["API доступ", "Ultra HD", "Команда до 10", "Поддержка 24/7"],
    color: "pink",
    popular: false,
  },
];

type Tab = "commands" | "gallery" | "menu" | "payment";

export default function Index() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("commands");
  const [activeStyle, setActiveStyle] = useState("Реализм");
  const [params, setParams] = useState<Record<string, string>>({
    resolution: "1024×1024",
    quality: "HD",
    count: "4",
  });
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "commands", label: "Команды", icon: "Terminal" },
    { id: "gallery", label: "Галерея", icon: "Images" },
    { id: "menu", label: "Меню", icon: "LayoutGrid" },
    { id: "payment", label: "Оплата", icon: "CreditCard" },
  ];

  const cmdColorBg: Record<string, string> = {
    "neon-purple": "bg-[hsla(270,80%,65%,0.15)]",
    "neon-cyan": "bg-[hsla(180,80%,55%,0.15)]",
    "neon-pink": "bg-[hsla(320,80%,65%,0.15)]",
    "neon-orange": "bg-[hsla(25,90%,60%,0.15)]",
  };
  const cmdColorText: Record<string, string> = {
    "neon-purple": "text-[hsl(270,80%,75%)]",
    "neon-cyan": "text-[hsl(180,80%,65%)]",
    "neon-pink": "text-[hsl(320,80%,75%)]",
    "neon-orange": "text-[hsl(25,90%,70%)]",
  };

  return (
    <div className="min-h-screen grid-bg">
      {/* Hero Header */}
      <header className="relative overflow-hidden pt-12 pb-8 px-4">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-80px] left-[-80px] w-[400px] h-[400px] rounded-full bg-[hsla(270,80%,65%,0.12)] blur-[80px]" />
          <div className="absolute bottom-[-40px] right-[-40px] w-[300px] h-[300px] rounded-full bg-[hsla(180,80%,55%,0.10)] blur-[60px]" />
        </div>

        <div className="max-w-2xl mx-auto text-center relative z-10">
          <div className="relative inline-flex items-center justify-center mb-6">
            <div className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-[hsl(270,80%,65%)] to-[hsl(320,80%,65%)] blur-xl opacity-50 animate-pulse-neon" />
            <div className="relative w-20 h-20 rounded-full glass neon-border-purple flex items-center justify-center animate-float">
              <span className="text-4xl">🤖</span>
            </div>
            <div
              className="absolute w-28 h-28 rounded-full border border-[hsla(270,80%,65%,0.25)] animate-spin-slow"
              style={{ borderStyle: "dashed" }}
            />
          </div>

          <div className="animate-slide-up">
            <p className="text-xs font-oswald tracking-[0.3em] uppercase text-[hsl(180,80%,60%)] mb-2">
              AI · Фото · Telegram
            </p>
            <h1 className="font-oswald text-5xl md:text-6xl font-bold mb-3 leading-none">
              <span className="shimmer-text">НЕЙРО</span>
              <span className="text-white"> ФОТО КИМ</span>
            </h1>
            <p className="text-[hsl(215,20%,65%)] text-lg max-w-md mx-auto leading-relaxed">
              Генерируй уникальные фото с помощью ИИ прямо в Telegram. Быстро, красиво, безлимитно.
            </p>
          </div>

          <div className="flex justify-center gap-6 mt-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            {[
              { val: "50K+", label: "Пользователей" },
              { val: "2M+", label: "Генераций" },
              { val: "4.9★", label: "Рейтинг" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-oswald text-2xl font-bold text-gradient-purple">{s.val}</div>
                <div className="text-xs text-[hsl(215,20%,50%)] mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <button
              onClick={() => navigate("/generate")}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-semibold text-base bg-gradient-to-r from-[hsl(270,80%,65%)] to-[hsl(320,80%,65%)] text-white glow-purple hover:opacity-90 transition-all duration-200"
            >
              <Icon name="Package" size={20} />
              Создать фото товара
            </button>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="sticky top-0 z-30 px-4 py-3 backdrop-blur-xl bg-[hsla(240,15%,6%,0.85)] border-b border-white/5">
        <div className="max-w-2xl mx-auto">
          <div className="glass rounded-2xl p-1.5 flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-br from-[hsl(270,80%,65%)] to-[hsl(320,80%,65%)] text-white glow-purple"
                    : "text-[hsl(215,20%,55%)] hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon name={tab.icon} size={15} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-4 py-8">

        {/* COMMANDS */}
        {activeTab === "commands" && (
          <div className="animate-fade-in space-y-4">
            <div className="mb-6">
              <h2 className="font-oswald text-2xl font-bold text-white mb-1">Команды бота</h2>
              <p className="text-[hsl(215,20%,55%)] text-sm">Все доступные команды для работы с ботом</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {COMMANDS.map((cmd) => (
                <a
                  key={cmd.label}
                  href={`https://t.me/kozhev83?start=${cmd.label.replace("/", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass glass-hover neon-border-purple rounded-2xl p-4 text-left group"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${cmdColorBg[cmd.color]}`}>
                      <Icon name={cmd.icon} size={18} className={cmdColorText[cmd.color]} />
                    </div>
                    <div>
                      <div className="font-oswald font-semibold text-white text-base">{cmd.label}</div>
                      <div className="text-[hsl(215,20%,55%)] text-sm mt-0.5">{cmd.desc}</div>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-6 glass neon-border-cyan rounded-2xl p-5 flex items-center justify-between">
              <div>
                <div className="font-oswald text-lg font-bold text-white">Открыть в Telegram</div>
                <div className="text-[hsl(215,20%,55%)] text-sm">Начни прямо сейчас — это бесплатно</div>
              </div>
              <a href="https://t.me/kozhev83" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-gradient-to-r from-[hsl(180,80%,55%)] to-[hsl(210,80%,65%)] text-[hsl(240,15%,6%)] font-bold px-5 py-2.5 rounded-xl hover:scale-105 transition-transform text-sm">
                <Icon name="Send" size={16} />
                Открыть
              </a>
            </div>
          </div>
        )}

        {/* GALLERY */}
        {activeTab === "gallery" && (
          <div className="animate-fade-in">
            <div className="mb-6">
              <h2 className="font-oswald text-2xl font-bold text-white mb-1">Галерея работ</h2>
              <p className="text-[hsl(215,20%,55%)] text-sm">Примеры изображений, созданных ботом</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {GALLERY_IMAGES.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(selectedImage === i ? null : i)}
                  className={`relative group rounded-2xl overflow-hidden transition-all duration-300 ${
                    selectedImage === i
                      ? "ring-2 ring-[hsl(270,80%,65%)] glow-purple scale-[1.02]"
                      : "hover:scale-[1.02]"
                  }`}
                >
                  <div className="aspect-square">
                    <img
                      src={img.url}
                      alt={img.label}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsla(240,15%,6%,0.9)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                    <div className="font-oswald font-bold text-white text-sm">{img.label}</div>
                  </div>
                  <div className="absolute top-2 right-2">
                    <span className="glass text-[hsl(270,80%,75%)] text-xs font-semibold px-2 py-1 rounded-lg">
                      {img.tag}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {selectedImage !== null && (
              <div className="mt-4 glass neon-border-purple rounded-2xl p-4 animate-fade-in">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-oswald font-bold text-white text-lg">{GALLERY_IMAGES[selectedImage].label}</div>
                    <div className="text-[hsl(215,20%,55%)] text-sm">Создано НейроБотом · Стиль: Реализм</div>
                  </div>
                  <a
                    href={selectedImage !== null ? GALLERY_IMAGES[selectedImage].url : "#"}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-[hsla(270,80%,65%,0.2)] text-[hsl(270,80%,75%)] border border-[hsla(270,80%,65%,0.4)] px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[hsla(270,80%,65%,0.35)] transition-colors"
                  >
                    <Icon name="Download" size={14} />
                    Скачать
                  </a>
                </div>
              </div>
            )}

            <a href="https://t.me/kozhev83?start=generate" target="_blank" rel="noopener noreferrer" className="mt-4 glass rounded-2xl border border-dashed border-white/10 p-8 text-center hover:border-[hsla(270,80%,65%,0.4)] transition-colors cursor-pointer group block">
              <div className="w-12 h-12 rounded-2xl bg-[hsla(270,80%,65%,0.1)] flex items-center justify-center mx-auto mb-3 group-hover:bg-[hsla(270,80%,65%,0.2)] transition-colors">
                <Icon name="Plus" size={24} className="text-[hsl(270,80%,75%)]" />
              </div>
              <div className="font-semibold text-white mb-1">Создать новое изображение</div>
              <div className="text-[hsl(215,20%,50%)] text-sm">Отправь запрос боту в Telegram</div>
            </a>
          </div>
        )}

        {/* MENU */}
        {activeTab === "menu" && (
          <div className="animate-fade-in space-y-6">
            <div className="mb-2">
              <h2 className="font-oswald text-2xl font-bold text-white mb-1">Стили и параметры</h2>
              <p className="text-[hsl(215,20%,55%)] text-sm">Настрой бота под себя</p>
            </div>

            <div className="glass rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[hsla(320,80%,65%,0.15)] flex items-center justify-center">
                  <Icon name="Palette" size={16} className="text-[hsl(320,80%,75%)]" />
                </div>
                <div className="font-oswald font-semibold text-white text-lg">Стиль генерации</div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {STYLES.map((style) => (
                  <button
                    key={style.name}
                    onClick={() => setActiveStyle(style.name)}
                    className={`flex items-center gap-2 p-3 rounded-xl border transition-all duration-200 ${
                      activeStyle === style.name
                        ? "bg-[hsla(270,80%,65%,0.2)] border-[hsla(270,80%,65%,0.6)] text-white glow-purple"
                        : "border-white/5 text-[hsl(215,20%,60%)] hover:border-white/15 hover:text-white"
                    }`}
                  >
                    <span className="text-xl">{style.emoji}</span>
                    <span className="text-sm font-medium">{style.name}</span>
                    {activeStyle === style.name && (
                      <Icon name="Check" size={14} className="ml-auto text-[hsl(270,80%,75%)]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[hsla(180,80%,55%,0.15)] flex items-center justify-center">
                  <Icon name="SlidersHorizontal" size={16} className="text-[hsl(180,80%,65%)]" />
                </div>
                <div className="font-oswald font-semibold text-white text-lg">Параметры</div>
              </div>
              <div className="space-y-4">
                {PARAMS.map((param) => (
                  <div key={param.key}>
                    <div className="text-[hsl(215,20%,65%)] text-sm mb-2">{param.label}</div>
                    <div className="flex gap-2 flex-wrap">
                      {param.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setParams((p) => ({ ...p, [param.key]: opt }))}
                          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                            params[param.key] === opt
                              ? "bg-gradient-to-r from-[hsl(270,80%,65%)] to-[hsl(320,80%,65%)] text-white"
                              : "glass text-[hsl(215,20%,55%)] hover:text-white"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <a href="https://t.me/kozhev83?start=settings" target="_blank" rel="noopener noreferrer" className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[hsl(270,80%,65%)] to-[hsl(320,80%,65%)] text-white font-oswald font-bold text-lg hover:scale-[1.02] transition-transform glow-purple block text-center">
              Сохранить настройки
            </a>
          </div>
        )}

        {/* PAYMENT */}
        {activeTab === "payment" && (
          <div className="animate-fade-in">
            <div className="mb-6 text-center">
              <h2 className="font-oswald text-2xl font-bold text-white mb-1">Тарифы</h2>
              <p className="text-[hsl(215,20%,55%)] text-sm">Выбери подходящий план подписки</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {PLANS.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative glass rounded-2xl p-5 transition-all ${
                    plan.color === "purple"
                      ? "neon-border-purple glow-purple"
                      : plan.color === "cyan"
                      ? "neon-border-cyan"
                      : "neon-border-pink"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-gradient-to-r from-[hsl(270,80%,65%)] to-[hsl(320,80%,65%)] text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                        ✦ Популярный
                      </span>
                    </div>
                  )}

                  <div className="flex items-start justify-between gap-4">
                    <div className="shrink-0">
                      <div className={`font-oswald font-bold text-xl mb-1 ${
                        plan.color === "purple" ? "text-gradient-purple" :
                        plan.color === "cyan" ? "text-gradient-cyan" :
                        "text-[hsl(320,80%,75%)]"
                      }`}>{plan.name}</div>
                      <div className="flex items-end gap-1">
                        <span className="font-oswald text-4xl font-bold text-white">{plan.price}₽</span>
                        <span className="text-[hsl(215,20%,50%)] text-sm mb-1">/мес</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5 mt-1">
                      {plan.features.map((f) => (
                        <div key={f} className="flex items-center gap-1.5 text-sm text-[hsl(215,20%,70%)]">
                          <Icon
                            name="Check"
                            size={12}
                            className={
                              plan.color === "purple" ? "text-[hsl(270,80%,75%)]" :
                              plan.color === "cyan" ? "text-[hsl(180,80%,65%)]" :
                              "text-[hsl(320,80%,75%)]"
                            }
                          />
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>

                  <a href="https://t.me/kozhev83" target="_blank" rel="noopener noreferrer" className={`mt-4 w-full py-3 rounded-xl font-oswald font-bold text-base transition-all hover:scale-[1.02] text-center block ${
                    plan.color === "purple"
                      ? "bg-gradient-to-r from-[hsl(270,80%,65%)] to-[hsl(320,80%,65%)] text-white"
                      : plan.color === "cyan"
                      ? "bg-[hsla(180,80%,55%,0.15)] text-[hsl(180,80%,65%)] border border-[hsla(180,80%,55%,0.4)] hover:bg-[hsla(180,80%,55%,0.25)]"
                      : "bg-[hsla(320,80%,65%,0.15)] text-[hsl(320,80%,75%)] border border-[hsla(320,80%,65%,0.4)] hover:bg-[hsla(320,80%,65%,0.25)]"
                  }`}>
                    Выбрать {plan.name}
                  </a>
                </div>
              ))}
            </div>

            <div className="mt-5 glass rounded-2xl p-4 flex items-center justify-center gap-4 flex-wrap">
              <span className="text-[hsl(215,20%,50%)] text-sm">Принимаем оплату:</span>
              <span className="text-2xl">💳</span>
              <span className="text-[hsl(215,20%,65%)] text-sm font-medium">Карты</span>
              <span className="text-2xl">🏦</span>
              <span className="text-[hsl(215,20%,65%)] text-sm font-medium">СБП</span>
              <span className="text-2xl">₿</span>
              <span className="text-[hsl(215,20%,65%)] text-sm font-medium">Крипто</span>
            </div>
          </div>
        )}
      </main>

      {/* Bottom CTA */}
      <div className="max-w-2xl mx-auto px-4 pb-10">
        <div className="glass neon-border-purple rounded-2xl p-6 text-center">
          <div className="text-3xl mb-3">🚀</div>
          <div className="font-oswald font-bold text-xl text-white mb-2">Попробуй Нейро Фото КИМ бесплатно</div>
          <div className="text-[hsl(215,20%,55%)] text-sm mb-4">Первые 10 генераций — без оплаты</div>
          <a href="https://t.me/kozhev83" target="_blank" rel="noopener noreferrer" className="inline-block bg-gradient-to-r from-[hsl(270,80%,65%)] via-[hsl(320,80%,65%)] to-[hsl(180,80%,55%)] text-white font-oswald font-bold px-8 py-3.5 rounded-xl hover:scale-105 transition-transform glow-purple text-lg">
            Запустить бота
          </a>
        </div>
      </div>
    </div>
  );
}