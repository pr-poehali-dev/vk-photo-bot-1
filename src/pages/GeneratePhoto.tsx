import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import func2url from "../../backend/func2url.json";

const GeneratePhoto = () => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const res = await fetch(func2url["generate-image"], {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Ошибка генерации");
      setImageUrl(data.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ошибка генерации");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center px-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gradient-purple mb-3">
            Фото товара
          </h1>
          <p className="text-muted-foreground text-lg">
            Опишите товар — ИИ создаст профессиональное фото
          </p>
        </div>

        <div className="glass rounded-2xl p-6 neon-border-purple mb-6">
          <Textarea
            placeholder="Например: красные кроссовки Nike, белый фон, вид сбоку"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[120px] bg-transparent border-border text-foreground placeholder:text-muted-foreground resize-none mb-4 text-base"
          />
          <Button
            onClick={generate}
            disabled={loading || !prompt.trim()}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 text-base rounded-xl"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Icon name="Loader2" size={20} className="animate-spin" />
                Генерирую...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Icon name="Sparkles" size={20} />
                Создать фото
              </span>
            )}
          </Button>
        </div>

        {error && (
          <div className="glass rounded-2xl p-4 border border-destructive/50 text-destructive text-center mb-6">
            {error}
          </div>
        )}

        {loading && !imageUrl && (
          <div className="glass rounded-2xl p-12 flex flex-col items-center gap-4 neon-border-cyan">
            <div className="w-16 h-16 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            <p className="text-muted-foreground animate-pulse-neon">
              Создаю фото, обычно занимает 20–40 секунд...
            </p>
          </div>
        )}

        {imageUrl && (
          <div className="glass rounded-2xl overflow-hidden neon-border-cyan animate-slide-up">
            <img
              src={imageUrl}
              alt="Сгенерированное фото товара"
              className="w-full object-contain max-h-[600px]"
            />
            <div className="p-4 flex gap-3">
              <a
                href={imageUrl}
                download="product-photo.png"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button className="w-full bg-accent/20 hover:bg-accent/30 text-accent border border-accent/40 rounded-xl">
                  <Icon name="Download" size={18} className="mr-2" />
                  Скачать
                </Button>
              </a>
              <Button
                onClick={() => { setImageUrl(null); setPrompt(""); }}
                variant="outline"
                className="flex-1 rounded-xl border-border"
              >
                <Icon name="RefreshCw" size={18} className="mr-2" />
                Новое фото
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneratePhoto;