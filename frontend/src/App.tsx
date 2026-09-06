import { useState } from "react";
import { Header } from "./components/Header";
import { Input } from "./components/Input";
import { Button } from "./components/Button";
import { UrlSchema } from "./validations/url.schema";
import { ErrorMessage } from "./components/ErrorMessage";
import { LinkService } from "./api/link.service";

function App() {
  const [text, setText] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);

  const handleSubmit = async () => {
    const parsed = UrlSchema.safeParse({ url: text });

    if (!parsed.success) {
      setErrorMessage(parsed.error.issues[0].message);
      return;
    } else {
      setErrorMessage(null);
    }

    setLoading(true);
    try {
      const { shortCode } = await LinkService.generateShortUrl({
        originalUrl: parsed.data?.url,
      });

      setShortenedUrl(shortCode);
      console.log(shortCode);
    } catch (e) {
      setErrorMessage(e instanceof Error ? e.message : "Unknown Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="flex flex-col items-center min-h-screen bg-bg text-ink">
        <section className="flex flex-col w-fit gap-4">
          <div>
            <h1 className="text-[42px] font-semibold text-ink">
              Shorten a link.
            </h1>
            <p className="text-[16px] text-muted">
              Paste a URL and get an eight-character link. No account, no setup,
              just the link.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Input text={text} setText={setText} />
              <Button onClick={handleSubmit} loading={loading} />
            </div>

            {errorMessage && <ErrorMessage message={errorMessage} />}
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
